import { Match } from "../types";

export const isMatchPlayed: (match: Match) => boolean = (match) => {
    if (!match) {
        return false;
    }

    const matchDateArray = match.match_date.split("-");
    const matchYear = parseInt(matchDateArray[0]);
    const matchMonth = parseInt(matchDateArray[1]);
    const matchDay = parseInt(matchDateArray[2]);

    const matchTimeArray = match.match_time.split(":");
    const matchHour = parseInt(matchTimeArray[0]);
    const matchMinute = parseInt(matchTimeArray[1]);

    const matchDate = new Date(
        matchYear,
        matchMonth - 1,
        matchDay,
        matchHour,
        matchMinute
    );

    const currentDate = new Date();

    return matchDate < currentDate;
};
