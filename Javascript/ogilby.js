var challenges = ["buttons", "maze", "spider", "jugs", "riddle", "room"];

function randomChallenge() {
    if (challengeStarted == true) return; //prevents multiple challenges spawning at once
    if (getRndInteger(100) > 70) { // 30% chance of encountering a challenge
        if (challengeStarted == false) {
            var r = challenges[getRndInteger(challenges.length)];
            var index;
            challengesEncountered += 1;
            switch (r) {
                case "buttons":
                    index = challenges.indexOf("buttons"); //these two lines prevents the same challenge appearing twice
                    challenges.splice(index, 1)
                    console.log(challenges);
                    startChallenge1();

                    break;
                case "maze":
                    index = challenges.indexOf("maze");
                    challenges.splice(index, 1);
                    console.log(challenges);
                    startPressurePChal();
                    break;
                case "spider":
                    index = challenges.indexOf("spider");
                    challenges.splice(index, 1);
                    console.log(challenges);
                    startSpiderChallenge();
                    break;
                case "jugs":
                    index = challenges.indexOf("jugs");
                    challenges.splice(index, 1);
                    console.log(challenges);
                    //startChallenge4();
                    break;
                case "riddle":
                    index = challenges.indexOf("riddle");
                    challenges.splice(index, 1);
                    console.log(challenges);
                    startRiddleChallenge();
                    break;
                case "room":
                    index = challenges.indexOf("room");
                    challenges.splice(index, 1);
                    console.log(challenges);
                    startRoomChal();
                    break;
                default:
                    return;
            }
        }
    }
}