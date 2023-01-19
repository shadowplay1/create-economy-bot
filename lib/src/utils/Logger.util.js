"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const colors_structure_1 = require("../structures/colors.structure");
class Logger {
    info(message) {
        return console.log(`${colors_structure_1.consoleColors.lightblue}[I] ${message}${colors_structure_1.consoleColors.reset}`);
    }
    error(message) {
        return console.log(`${colors_structure_1.consoleColors.lightred} [E] ${message}${colors_structure_1.consoleColors.reset}`);
    }
    hint(message) {
        return console.log(`${colors_structure_1.consoleColors.cyan}[hint] ${message}${colors_structure_1.consoleColors.reset}`);
    }
    warn(message) {
        return console.log(`${colors_structure_1.consoleColors.lightyellow}${message}${colors_structure_1.consoleColors.reset}`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.util.js.map