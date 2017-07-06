export class KanbanItem {
  constructor(
    public _id: string = "",
    public type: string = "kanban-item",
    public shortDescription: string = "",
    public description: string = "",
    public color: string = undefined
  ) {}
}
