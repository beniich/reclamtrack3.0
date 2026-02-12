export type LogEntry = {
    id: string;
    user: {
        name: string;
        avatar?: string | null;
        roleId: string;
    };
    action: "CREATED" | "STATUS CHANGE" | "DELETED" | "MODIFIED";
    target: string;
    details: string;
    timestamp: string;
    severity?: "critical" | "normal";
};
