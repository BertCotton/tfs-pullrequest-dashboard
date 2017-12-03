import {Injectable, Pipe, PipeTransform} from "@angular/core";
import { PullRequestViewModel } from "./pullRequestViewModel";

@Pipe({
    name: "prFilter",
    pure: false
})
@Injectable()
export class PullRequestFilterPipe  implements PipeTransform {
    public transform(items: PullRequestViewModel[], arg: string): PullRequestViewModel[] {
        return items.filter((x) => {
            return (arg === "requestedByMe" && x.requestedByMe) ||
                   (arg === "assignedToMe" && x.assignedToMe && !x.requestedByMe) ||
                   (arg === "assignedToMyTeam" && x.assignedToMyTeam && !x.requestedByMe && !x.assignedToMe) ||
                   (arg === "other" && !x.requestedByMe && !x.assignedToMe && !x.assignedToMyTeam) ||
                   (arg === "all");
        });
    }
}
