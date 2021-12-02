import { PostgreSqlDriver } from "@mikro-orm/postgresql";

export default {
    baseDir: process.cwd(),
    discovery: {
        warnWhenNoEntities: true, // by default, discovery throws when no entity is processed
        requireEntitiesArray: false, // force usage of class refrences in `entities` instead of paths
        alwaysAnalyseProperties: false, // do not analyse properties when not needed (with ts-morph)
    },
    driver: PostgreSqlDriver,
};