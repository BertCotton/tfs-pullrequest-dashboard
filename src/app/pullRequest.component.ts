import { Component, Input } from "@angular/core";

import { PullRequest, Repository, Identity, Reviewer, Vote } from "./tfsmodel";
import { PullRequestViewModel } from "./pullRequestViewModel";

@Component({
    selector: "pull-request",
    templateUrl: "pullRequest.component.html",
})
export class PullRequestComponent {

    @Input()
    public pullRequest: PullRequest;

    public getVoteClasses(reviewer: Reviewer): string {
        let result = "fa vote";
        if (reviewer.vote === Vote.NoResponse) {
            result += " fa-minus-circle";
        } else if (reviewer.vote === Vote.Rejected) {
            result += " fa-times-circle rejected";
        } else if (reviewer.vote === Vote.Approved) {
            result += " fa-check-circle approved";
        } else if (reviewer.vote === Vote.ApprovedWithSuggestions) {
             result += " fa-check-circle-o approved";
        } else if (reviewer.vote === Vote.WaitingForAuthor) {
            result += " fa-minus-circle waiting";
        }
        return result;
    }

    public getVoteTooltip(reviewer: Reviewer): string {
        if (reviewer.vote === Vote.NoResponse) {
            return "No Response";
        } else if (reviewer.vote === Vote.Rejected) {
            return "Rejected";
        } else if (reviewer.vote === Vote.Approved) {
            return "Approved";
        } else if (reviewer.vote === Vote.ApprovedWithSuggestions) {
             return "Approved With Suggestions";
        } else if (reviewer.vote === Vote.WaitingForAuthor) {
            return "Waiting for Author";
        }
    }
}
