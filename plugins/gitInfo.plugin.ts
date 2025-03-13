import { Plugin } from "rollup"
import lastLines from "read-last-lines"
import fs from "fs"

export default function gitInfoPlugin(): Plugin {
    const moduleId = "virtual:git-info"
    const resolvedModuleId = "\0" + moduleId
    return {
        name: "git-info",
        resolveId(id) {
            // This is a virtual module, so we need to resolve it to a unique ID.
            // We use a null byte prefix to avoid conflicts with real modules.
            if (id == moduleId) return resolvedModuleId
        },
        async load(id) {
            if (id == resolvedModuleId) {
                let gitCommit: string | undefined = undefined
                let gitBranchOrTag: string | undefined = undefined

                try {
                    if (fs.existsSync("./git-status")) {
                        const gitBranchName = fs.readFileSync("./git-status/branch-name").toString()
                        gitCommit = fs.readFileSync("./git-status/commit").toString()

                        let splits = gitBranchName.split("/")
                        gitBranchOrTag = splits[splits.length - 1].trim()
                    }
                } catch (err) {}

                try {
                    if (!gitCommit) {
                        const lastLog = await lastLines.read(".git/logs/HEAD", 1)

                        gitCommit = lastLog.split(" ")[1]
                    }
                } catch (err) {}

                if (!gitCommit) {
                    gitCommit = "untracked"
                } else {
                    gitCommit = gitCommit.trim().substring(0, 7)
                }

                if (!gitBranchOrTag) {
                    gitBranchOrTag = gitCommit
                }

                return `
                    export const commit = "${gitCommit}";
                    export const branch = "${gitBranchOrTag}";
                    `
            }
        }
    }
}
