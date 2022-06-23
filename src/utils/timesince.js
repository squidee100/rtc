export function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var str = "";

    var interval = seconds / 31536000;

    while (true) {
        if (interval > 1) {
            str = Math.floor(interval) + " year";
            break;
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            str = Math.floor(interval) + " month";
            break;
        }
        interval = seconds / 86400;
        if (interval > 1) {
            str = Math.floor(interval) + " day";
            break;
        }
        interval = seconds / 3600;
        if (interval > 1) {
            str = Math.floor(interval) + " hour";
            break;
        }
        interval = seconds / 60;
        if (interval > 1) {
            str = Math.floor(interval) + " minute";
            break;
        }
        break;
    }

    if (interval >= 2) {
        str += "s";
    }

    if (interval <= 1) {
        str = "less than a minute";
    }

    return str;
}
