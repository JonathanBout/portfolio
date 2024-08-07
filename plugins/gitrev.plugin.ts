import { Plugin } from "rollup"
import lastLines from "read-last-lines"

export default function gitrevPlugin(): Plugin {
    const moduleId = "virtual:gitrev"
    const resolvedModuleId = "\0" + moduleId
    return {
        name: "gitrev",
        resolveId(id) {
            if (id == moduleId) return resolvedModuleId
        },
        async load(id) {
            if (id == resolvedModuleId) {
                const lastLog = await lastLines.read(".git/logs/HEAD", 1)
                const currentHash = lastLog.split(" ")[1]
                return `export const rev = "${currentHash}"`
            }
        }
    }
}
