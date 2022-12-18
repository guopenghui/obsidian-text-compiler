export const LIST_TO_TREE_NAME = "list to tree";
export const LIST_TO_TREE_DESC = "Convert list to tree (list prefix must be '+')";
export const LIST_TO_TREE_EXAMPLE =
    `+ Root
    + A
        + AA
        + AB
            + ABA
    + B
        + BA
    + C
`;

type Node = {
    no: number,
    lev: number,
    cont: string,
    prefix: string,
    children?: Node[],
    sibling?: boolean,
};

export function transform(text: string): string {
    try {
        // build tree
        text = text.trim();
        let root: Node = { no: -1, lev: -1, cont: "", prefix: "", children: null };
        let stack = [root];
        const lines = text.split("\n");
        lines.forEach((line, i) => {
            const lev = line.indexOf("+");
            while (stack.last().lev >= lev) stack.pop();
            let parent = stack.last();
            if (!parent.children) {
                parent.children = [];
            } else {
                parent.children.last().sibling = true;
            }
            const node = {
                no: i,
                lev,
                cont: line.trim().slice(2),
                prefix: ""
            };
            parent.children.push(node);
            stack.push(node);
        });

        // generate tree text
        let res = Array(lines.length).fill("");
        let queue = [...root.children];
        //let queue = [root]
        while (queue.length !== 0) {
            let parent = queue.shift();
            res[parent.no] += parent.sibling
                ? `${parent.prefix}├── ${parent.cont}`
                : `${parent.prefix}└── ${parent.cont}`;
            if (!parent.children) continue;

            parent.children.forEach(node => {
                node.prefix = parent.prefix + (parent.sibling ? `│   ` : `    `);
            });
            queue.push(...parent.children);
        }
        res = res.map(line => line.slice(4));
        return res.join("\n");
    } catch (e) {
        return "Invalid Input";
    }
}