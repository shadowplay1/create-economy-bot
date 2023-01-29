"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const colors_structure_1 = require("../structures/colors.structure");
class Logger {
    /**
     * Sends the success log in the console.
     * @param message The message to send.
     */
    success(message) {
        return console.log(`${colors_structure_1.consoleColors.lightgreen}[OK] ${message}${colors_structure_1.consoleColors.reset}`);
    }
    /**
     * Sends the information log in the console.
     * @param message The message to send.
     */
    info(message) {
        return console.log(`${colors_structure_1.consoleColors.lightblue}[I] ${message}${colors_structure_1.consoleColors.reset}`);
    }
    /**
     * Sends the error log in the console.
     * @param message The message to send.
     */
    error(message, exit = false) {
        console.log(`${colors_structure_1.consoleColors.lightred}[E] ${message}${colors_structure_1.consoleColors.reset}`);
        if (exit) {
            process.exit(1);
        }
        return;
    }
    /**
     * Sends the hint log in the console.
     * @param message The message to send.
     */
    hint(message) {
        return console.log(`${colors_structure_1.consoleColors.lightcyan}[hint] ${message}${colors_structure_1.consoleColors.reset}`);
    }
    /**
     * Sends the warn log in the console.
     * @param message The message to send.
     */
    warn(message) {
        return console.log(`${colors_structure_1.consoleColors.lightyellow}[!] ${message}${colors_structure_1.consoleColors.reset}`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.util.js.map