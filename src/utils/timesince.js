export function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var str = "";

    var interval = seconds / 31536000;

    if (interval > 1) {
        str = Math.floor(interval) + " year";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        str = Math.floor(interval) + " month";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        str = Math.floor(interval) + " day";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        str = Math.floor(interval) + " hour";
    }
    interval = seconds / 60;
    if (interval > 1) {
        str = Math.floor(interval) + " minute";
    }

    if (interval >= 2) {
        str += "s";
    }

    if (interval <= 1) {
        str = "less than a minute";
    }

    return str;
}
