# Git branch processes management

## Primary branch process
1)	Create a feature branch (from master).
2)	Carry out development work on new feature branch.
3)	Create a release branch (from master).
4)	Merge your feature branch into your release branch.
5)	Release branch is code reviewed and tested.
6)	
    1) If code review is rejected, continue work required on the feature branch and continue from step three.
    2) If code is accepted the release branch is merged into master

## Hotfixes
When a hotfix is required to push an urgent correction to the repo, the process will be slightly different, as follows:
1)	Create a hotfix branch (from master).
2)	Carry out development work on new hotfix branch.
5)	Hotfix branch is code reviewed and tested.
6)	
    1) If code review is rejected, continue work required on the hotfix branch and continue from step two.
    2) If code is accepted the hotfix branch is merged directly into master


# Branch naming conventions
[Feature/Release/Hotfix]-[ticket-ID]-[short-description]
e.g. Feature-PM12-sending-system


