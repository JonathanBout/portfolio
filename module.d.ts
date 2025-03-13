declare module "virtual:git-info" {
    /**
     * The commit hash of the current git HEAD,
     * or "untracked" if the repository is not tracked by git.
     */

    export const commit: string
    /**
     * The branch or tag name of the current git HEAD,
     * or the commit hash.
     */
    export const branch: string
}

declare module "eslint-plugin-vue"
declare module "@eslint/js"
