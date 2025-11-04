"use client";
import { Node,NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon, Key } from "lucide-react";
import {memo, useState} from "react";
import { BaseExecutionNode } from "../base-execution-node";

type HttpRequestNodeData ={
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [Key: string] : unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo ((props: NodeProps<HttpRequestNodeType>) => {
    const nodeData = props.data as HttpRequestNodeData;
    const description = nodeData?.endpoint
    ?`${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "Not configurre"
     
    return(
        <>
        <BaseExecutionNode
            {...props}
            id={props.id}
            icon={GlobeIcon}
            name="HTTP Request"
            onSettings={() => {}}
            onDoubleClick={() => {}}

        />
        </>
    )
});

HttpRequestNode.displayName = "HttprequestNode";