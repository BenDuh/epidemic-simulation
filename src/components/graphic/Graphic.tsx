import React, { Component } from "react";
import "../../styles/App.css";

import Person from "../../models/Person";
import PersonLight from "../../models/PersonLight";
import PersonStatus from "../../models/PersonStatus";

interface Props {}
interface State {
  contextCanvas: any;
  arrayMembers: Person[];
  coordPersonInfected: PersonLight[];
}

const fps: number = 60;
export default class Graphic extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      contextCanvas: React.createRef(),
      arrayMembers: [],
      coordPersonInfected: [],
    };
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    let member: Person;
    let arrayMembers: any = [];
    let coordPersonInfected: PersonLight[] = [];
    for (let i = 0; i < 50; i++) {
      member = {
        id: i,
        x: this._getRandomArbitrary(2, 497),
        y: this._getRandomArbitrary(2, 297),
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
  }

  _getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  draw() {
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
        ctx.fillStyle = "white";
      } else {
        this._isInfected(member);
        ctx.fillStyle = "red";
      }
      ctx.fillRect(member.x, member.y, 6, 6);
      ctx.stroke();
      ctx.closePath();
      this._limitCanvas(member, statusInfected, index);
    });
    setTimeout(() => requestAnimationFrame(this.draw), 1000 / fps);
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

  _infection(person: Person, index: number) {
    let coordPersonInfected: PersonLight[] = this.state.coordPersonInfected;
    let isInfected: boolean = false;
    coordPersonInfected.map((infected, index) => {
      if (
        this._inRange(person.x, infected.x - 3, infected.x + 3) &&
        this._inRange(person.y, infected.y - 3, infected.y + 3)
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
      this.setState({ coordPersonInfected, arrayMembers });
    }
  }

  _inRange(x: number, min: number, max: number) {
    return (x - min) * (x - max) <= 0;
  }

  _direction(
    oldDirection: number,
    limitCanvasMin: boolean,
    limitCanvasMax: boolean
  ): number {
    let newDirection: number;
    let luck = Math.random();
    if (oldDirection === 1) {
      if (luck < 0.7 && !limitCanvasMax) {
        newDirection = 1;
      } else {
        newDirection = 0;
      }
    } else if (oldDirection === 0) {
      if (luck < 0.5) {
        newDirection = 0;
      } else if (luck < 0.75) {
        newDirection = 1;
      } else {
        newDirection = -1;
      }
    } else {
      if (luck < 0.7 && !limitCanvasMin) {
        newDirection = -1;
      } else {
        newDirection = 0;
      }
    }
    return newDirection;
  }

  _limitDirection(oldDirection: number) {
    let newDirection: number;
    let luck = Math.random();
    if (oldDirection === 1) {
      if (luck < 0.8) {
        newDirection = 2;
      } else {
        newDirection = 0;
      }
    } else {
      if (luck < 0.8) {
        newDirection = -2;
      } else {
        newDirection = 0;
      }
    }
    return newDirection;
  }

  _limitCanvas(member: Person, statusInfected: PersonStatus, index: number) {
    let x: number = member.x;
    let y: number = member.y;
    let newDirectionX: number;
    let newDirectionY: number;
    let luckChangeDirection = Math.random();
    let directionNull: boolean =
      member.oldDirectionX === 0 && member.oldDirectionY === 0;
    let limitCanvasXMin: boolean = x === 5 || x === 2;
    let limitCanvasXMax: boolean = x === 495 || x === 497;
    let limitCanvasYMin: boolean = y === 5 || y === 2;
    let limitCanvasYMax: boolean = y === 295 || y === 297;
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
      x = x + this._limitDirection(1);
    } else if (x + newDirectionX > 497) {
      x = x + this._limitDirection(-1);
    } else {
      x = x + newDirectionX;
    }
    if (y + newDirectionY < 3) {
      y = y + this._limitDirection(1);
    } else if (y + newDirectionY > 297) {
      y = y + this._limitDirection(-1);
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

  render() {
    return (
      <div className="containerCanvas">
        <canvas
          ref="canvas"
          width={500}
          height={300}
          className="canvas"
          id="canvas"
        />
      </div>
    );
  }
}
