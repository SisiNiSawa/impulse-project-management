export class TodoItem {
  constructor(
    public content: string = "",
    public order: number = 0,
    public color: string = "",
    public checked: boolean = false
  ) {}
}
