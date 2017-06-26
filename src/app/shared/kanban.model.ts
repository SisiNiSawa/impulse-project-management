export class Kanban {
  constructor(
    public _id: string = "",
    public type: string = "kanban",
    public name: string = "",
    public icon: string = "fa-columns",
    public cards: any[] = []
  ) {}
}
