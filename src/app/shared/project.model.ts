export class Project {
  constructor(
    public _id: string = "",
    public name: string = "",
    public icon: string = "fa-file-o",
    public type: string = "project",
    public order: number = 0,
    public modules: any[] = []
  ) {}
}
