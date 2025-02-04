import { Plugin } from "rollup"
import lastLines from "read-last-lines"

export default function gitrevPlugin(): Plugin {
    const moduleId = "virtual:gitrev"
    const resolvedModuleId = "\0" + moduleId
    return {
        name: "gitrev",
        resolveId(id) {
            // This is a virtual module, so we need to resolve it to a unique ID.
            // We use a null byte prefix to avoid conflicts with real modules.
            if (id == moduleId) return resolvedModuleId
        },
        async load(id) {
            if (id == resolvedModuleId) {
                const lastLog = await lastLines.read(".git/logs/HEAD", 1)
                // if any error occurs, we don't know the git revision hash which means the project is untracked.
                if (!lastLog) return `export const rev = "untracked"`
                const currentHash = lastLog.split(" ")[1] // The current git revision hash is the second word in the last line of the log.
                return `export const rev = "${currentHash || "untracked"}"`
            }
        }
    }
}
