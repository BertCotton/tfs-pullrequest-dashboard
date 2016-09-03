import { Component, OnInit } from "@angular/core";

import { TfsService } from "./tfsservice";
import { PullRequest, Repository, Identity, Reviewer } from "./tfsmodel";
import { PullRequestViewModel } from "./pullRequestViewModel";

@Component({
    selector: "my-app",
    templateUrl: "app/app.component.html",
    providers: [TfsService]
})
export class AppComponent implements OnInit {
    constructor(private tfsService: TfsService) { }

    public pullRequests: PullRequestViewModel[] = [];

    public currentUser: Identity;

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.pullRequests = [];

        this.tfsService.getCurrentUser()
            .then((x) => {
                this.currentUser = x;
                return this.tfsService.getRepositories();
            })
            .then((repos: Repository[]) => {

                let repoPRSearch = [];
                for (let repo of repos) {
                    this.tfsService.getPullRequests(repo)
                        .then(prs => {
                            for (let pr of prs) {
                                this.pullRequests.push(new PullRequestViewModel(pr, repo, this.currentUser));
                            }
                        });
                }

                return repoPRSearch;
            });
    }

    public getVoteClasses(reviewer: Reviewer): string {
        let result = "fa vote";
        if (reviewer.vote === 0) {
            result += " fa-minus-circle";
        } else if (reviewer.vote === -10) {
            result += " fa-times-circle rejected";
        } else if (reviewer.vote === 10 || reviewer.vote === 5) {
            result += " fa-check-circle approved";
        } else if (reviewer.vote === -5) {
            result += " fa-minus-circle waiting";
        }
        return result;
    }
}
