import React, { Component } from "react";
import "../../styles/App.css";

import Person from "../../models/Person";
import PersonLight from "../../models/PersonLight";
import PersonStatus from "../../models/PersonStatus";
import { delay } from "lodash";
import ESColors from "../../ressources/ESColors";
import Dashboard from "../dashboard/Dashboard";
import StatsGraph from "../../models/StatsGraph";
import DistancingSocial from "../../models/DistancingSocial";
import LevelInfection from "../../models/LevelInfection";

interface Props {}
interface State {
  contextCanvas: any;
  arrayMembers: Person[];
  coordPersonInfected: PersonLight[];
  distancingSocial: DistancingSocial;
  levelInfection: LevelInfection;
}

const fps: number = 60;
export default class Graphic extends Component<Props, State> {
  timer: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      contextCanvas: React.createRef(),
      arrayMembers: [],
      coordPersonInfected: [],
      distancingSocial: DistancingSocial.hard,
      levelInfection: LevelInfection.low,
    };
    this.timer = null;
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this._resetAction();
  }

  render() {
    const buttonReset = {
      width: 145,
      marginTop: 15,
    };
    return (
      <div className="containerCanvasDashboard">
        <div className="containerCanvas">
          <canvas
            ref="canvas"
            width={550}
            height={325}
            className="canvas"
            id="canvas"
          />
          <button
            className="button"
            style={buttonReset}
            onClick={() => this._resetAction(true)}
          >
            reset simulation
          </button>
        </div>
        <Dashboard
          statsGraph={this._statsGraphic()}
          changeDistSoc={(distancingSocial: DistancingSocial) =>
            this._changeDistancingSocial(distancingSocial)
          }
          distancingSocial={this.state.distancingSocial}
          changeLevelInfection={(levelInfection: LevelInfection) =>
            this._changeLevelInfection(levelInfection)
          }
          levelInfection={this.state.levelInfection}
        />
      </div>
    );
  }

  _resetAction(clear?: boolean) {
    let member: Person;
    let arrayMembers: any = [];
    let coordPersonInfected: PersonLight[] = [];
    if (clear) {
      clearTimeout(this.timer);
      const canvas: any = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    for (let i = 0; i < 100; i++) {
      member = {
        id: i,
        x: this._getRandomArbitrary(2, 547),
        y: this._getRandomArbitrary(2, 322),
        oldX: 0,
        oldY: 0,
        oldDirectionX: 0,
        oldDirectionY: 0,
        status: i < 1 ? PersonStatus.infected : PersonStatus.none,
      };
      if (i < 1) {
        coordPersonInfected.push({ id: member.id, x: member.x, y: member.y });
      }
      arrayMembers.push(member);
    }
    this.setState({ arrayMembers, coordPersonInfected }, () => this.draw());
    delay(() => this._curedOrDeath(0, 0), 15000);
  }

  _changeDistancingSocial(distancingSocial: DistancingSocial): void {
    this.setState({ distancingSocial });
  }

  _getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  draw(): void {
    const canvas: any = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    this.state.arrayMembers.map((member: Person, index: number) => {
      let statusInfected = member.status;
      if (
        this.state.coordPersonInfected.find(
          (infected) => infected.id === member.id
        ) &&
        member.status === PersonStatus.none
      ) {
        statusInfected = PersonStatus.infected;
      }
      ctx.clearRect(member.oldX, member.oldY, 6, 6);
      ctx.beginPath();
      if (
        member.status === PersonStatus.none &&
        !this.state.coordPersonInfected.find((infected) => {
          return infected.id === member.id;
        })
      ) {
        this._infection(member, index);
        ctx.fillStyle = ESColors.none;
      } else if (member.status === PersonStatus.infected) {
        this._isInfected(member);
        ctx.fillStyle = ESColors.infected;
      } else if (member.status === PersonStatus.recovered) {
        ctx.fillStyle = ESColors.recovered;
      } else {
        ctx.fillStyle = ESColors.death;
      }
      ctx.fillRect(member.x, member.y, 6, 6);
      ctx.stroke();
      ctx.closePath();
      if (member.status !== PersonStatus.death) {
        this._limitCanvas(member, statusInfected, index);
      }
    });
    this.timer = setTimeout(() => requestAnimationFrame(this.draw), 1000 / fps);
  }

  _isInfected(infected: Person): void {
    let coordPersonInfected: PersonLight[] = this.state.coordPersonInfected;
    let indexInfected = coordPersonInfected.findIndex((infected, i) => {
      return infected.id === infected.id;
    });
    coordPersonInfected[indexInfected] = {
      id: infected.id,
      x: infected.x,
      y: infected.y,
    };

    this.setState({ coordPersonInfected });
  }

  _infection(person: Person, index: number): void {
    let coordPersonInfected: PersonLight[] = this.state.coordPersonInfected;
    let isInfected: boolean = false;
    coordPersonInfected.map((infected, index) => {
      if (
        this._inRange(
          person.x,
          infected.x - this.state.levelInfection,
          infected.x + this.state.levelInfection
        ) &&
        this._inRange(
          person.y,
          infected.y - this.state.levelInfection,
          infected.y + this.state.levelInfection
        )
      ) {
        isInfected = true;
      }
    });

    if (isInfected) {
      let arrayMembers: Person[] = this.state.arrayMembers;
      coordPersonInfected.push({
        id: person.id,
        x: person.x,
        y: person.y,
      });
      arrayMembers[index].status = PersonStatus.infected;
      this.setState({ coordPersonInfected, arrayMembers }, () =>
        delay(
          () => this._curedOrDeath(index, coordPersonInfected.length - 1),
          15000
        )
      );
    }
  }

  _curedOrDeath(indexMember: number, indexInfected: number): void {
    let coordPersonInfected: PersonLight[] = this.state.coordPersonInfected;
    let arrayMembers: Person[] = this.state.arrayMembers;
    coordPersonInfected = coordPersonInfected.splice(indexInfected, 2);
    let luck = Math.random();
    if (luck < 0.8) {
      arrayMembers[indexMember].status = PersonStatus.recovered;
    } else {
      arrayMembers[indexMember].status = PersonStatus.death;
    }
    this.setState({ arrayMembers });
  }

  _inRange(x: number, min: number, max: number): boolean {
    return (x - min) * (x - max) <= 0;
  }

  _direction(
    oldDirection: number,
    limitCanvasMin: boolean,
    limitCanvasMax: boolean
  ): number {
    let newDirection: number;
    let luck = Math.random();
    if (oldDirection === this.state.distancingSocial) {
      if (luck < 0.7 && !limitCanvasMax) {
        newDirection = this.state.distancingSocial;
      } else {
        newDirection = 0;
      }
    } else if (oldDirection === 0) {
      if (luck < 0.5) {
        newDirection = 0;
      } else if (luck < 0.75) {
        newDirection = this.state.distancingSocial;
      } else {
        newDirection = -this.state.distancingSocial;
      }
    } else {
      if (luck < 0.7 && !limitCanvasMin) {
        newDirection = -this.state.distancingSocial;
      } else {
        newDirection = 0;
      }
    }
    return newDirection;
  }

  _limitDirection(oldDirection: number): number {
    let newDirection: number;
    let luck = Math.random();
    if (oldDirection === this.state.distancingSocial) {
      if (luck < 0.8) {
        newDirection = this.state.distancingSocial * 3;
      } else {
        newDirection = 0;
      }
    } else {
      if (luck < 0.8) {
        newDirection = -this.state.distancingSocial * 3;
      } else {
        newDirection = 0;
      }
    }
    return newDirection;
  }

  _limitCanvas(
    member: Person,
    statusInfected: PersonStatus,
    index: number
  ): void {
    let x: number = member.x;
    let y: number = member.y;
    let newDirectionX: number;
    let newDirectionY: number;
    let luckChangeDirection = Math.random();
    let directionNull: boolean =
      member.oldDirectionX === 0 && member.oldDirectionY === 0;
    let limitCanvasXMin: boolean = this._inRange(
      x,
      2,
      2 + 2 * this.state.distancingSocial
    );
    let limitCanvasXMax: boolean = this._inRange(
      x,
      547,
      547 - 2 * this.state.distancingSocial
    );
    let limitCanvasYMin: boolean = this._inRange(
      y,
      2,
      2 + 2 * this.state.distancingSocial
    );
    let limitCanvasYMax: boolean = this._inRange(
      y,
      322,
      322 - 2 * this.state.distancingSocial
    );
    let limitCanvas =
      limitCanvasXMin || limitCanvasXMax || limitCanvasYMin || limitCanvasYMax;
    if (luckChangeDirection < 0.9 && !directionNull && !limitCanvas) {
      newDirectionX = member.oldDirectionX;
      newDirectionY = member.oldDirectionY;
    } else {
      newDirectionX = this._direction(
        member.oldDirectionX,
        limitCanvasXMin,
        limitCanvasXMax
      );
      newDirectionY = this._direction(
        member.oldDirectionY,
        limitCanvasYMin,
        limitCanvasYMax
      );
    }
    if (x + newDirectionX < 3) {
      x = x + this._limitDirection(this.state.distancingSocial);
    } else if (x + newDirectionX > 547) {
      x = x + this._limitDirection(-this.state.distancingSocial);
    } else {
      x = x + newDirectionX;
    }
    if (y + newDirectionY < 3) {
      y = y + this._limitDirection(this.state.distancingSocial);
    } else if (y + newDirectionY > 322) {
      y = y + this._limitDirection(-this.state.distancingSocial);
    } else {
      y = y + newDirectionY;
    }
    let arrayMembers: any = this.state.arrayMembers;
    arrayMembers[index] = {
      id: member.id,
      x,
      y,
      oldX: member.x,
      oldY: member.y,
      oldDirectionX: newDirectionX,
      oldDirectionY: newDirectionY,
      status: statusInfected,
    };
    this.setState({
      arrayMembers,
    });
  }

  _changeLevelInfection(levelInfection: LevelInfection) {
    this.setState({ levelInfection });
  }

  _statsGraphic(): StatsGraph {
    let statsGraph: StatsGraph = {
      none: 0,
      infected: 0,
      recovered: 0,
      death: 0,
    };
    this.state.arrayMembers.map((member) => {
      switch (member.status) {
        case PersonStatus.none:
          statsGraph.none = statsGraph.none + 1;
          break;
        case PersonStatus.infected:
          statsGraph.infected = statsGraph.infected + 1;
          break;
        case PersonStatus.recovered:
          statsGraph.recovered = statsGraph.recovered + 1;
          break;
        case PersonStatus.death:
          statsGraph.death = statsGraph.death + 1;
          break;
      }
    });
    return statsGraph;
  }
}
