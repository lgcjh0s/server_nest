import * as moment from "moment";

const Logger = () => {

    const assemble = (level: 'debug' | 'info' | 'error', message: string, tag: string): string => {
        const sysDt: string = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
        const log: string = level.toUpperCase() + ' :: ' + sysDt
            + (tag === ' ' ? '' : ' [' + tag + '] ') + message;
        
        return log;
    };

    const debug = (message: string, tag: string = ''): void => {
        console.debug(assemble('debug', message, tag));
    };

    const info = (message: string, tag: string = ''): void => {
        console.info(assemble('info', message, tag));
    };

    const error = (message: string, tag: string = ''): void => {
        console.error(assemble('error', message, tag));
    };

    return {
        debug,
        info,
        error
    }
};

export {
    Logger
}