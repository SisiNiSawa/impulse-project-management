export class KanbanCard {
  constructor(
    public _id: string = "",
    public type: string = "kanban-card",
    public name: string = "",
    public order: number = 0,
    public items: any[] = []
  ) {}
}
