"use client";

import { createId} from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
 } from "@/components/ui/sheet";
 import { NodeType } from "@/generated/prisma";
 import { Separator } from "./ui/separator";


 export type NodeTypeOption = {
    type: NodeType;
    lable: string;
    description: string;
    icon: React.ComponentType<{className?: string}> | string;
 };

 const triggerNodes: NodeTypeOption[] = [
    {
        type: NodeType.MANUAL_TRIGGER,
        lable: "trigfer manually",
        description: "Runs the flow on clicking a button. Good for getting started quickly",
        icon: MousePointerIcon,
    },
    {
        type: NodeType.GOOGLE_FORM_TRIGGER,
        lable: "Google Form ",
        description: "Triggers the flow when a Google Form is submitted",
        icon: "/logos/googleform.svg",
    },
    {
        type: NodeType.STRIPE_TRIGGER,
        lable: "Stripe",
        description: "Triggers the flow when a Stripe event is captured",
        icon: "/logos/stripe.svg",
    },
 ];

const executionNodes : NodeTypeOption[] = [
    {
        type: NodeType.HTTP_REQUEST,
        lable: "HTTP Request",
        description: "Makes an HTTP request",
        icon: GlobeIcon,
    },
    {
        type: NodeType.GEMINI,
        lable: "Gemini",
        description: "Uses Google Gemini to generate text",
        icon: "/logos/gemini.svg",
    },
    {
        type: NodeType.OPENAI,
        lable: "OpenAI",
        description: "Uses OpenAI to generate text",
        icon: "/logos/openai.svg",
    },
    {
        type: NodeType.ANTROPIC,
        lable: "Anthropic",
        description: "Uses Anthropic to generate text",
        icon: "/logos/anthropic.svg",
    },
    {
        type: NodeType.DISCORD,
        lable: "Discord",
        description: "Send message to Discord",
        icon: "/logos/discord.svg",
    },
    {
        type: NodeType.SLACK,
        lable: "Slack",
        description: "Send message to Slack",
        icon: "/logos/slack.svg",
    },
];

interface NodeSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
};

export function NodeSelector({
    open,
    onOpenChange,
    children
}: NodeSelectorProps) {
    const { setNodes, getNodes, screenToFlowPosition} = useReactFlow();
    const handleNodeSelect = useCallback((nodeType: NodeTypeOption) => {
         if (nodeType.type === NodeType.MANUAL_TRIGGER){
           const nodes = getNodes();
           const hasManualTrigger = nodes.some(
            (node) => node.type === NodeType.MANUAL_TRIGGER,
           );
           if (hasManualTrigger) {
            toast.error("Only one manual trigger is allowde per workflow")
            return;
           }
         }

         setNodes((nodes) => {
            const hasManualTrigger = nodes.some(
                (node) => node.type === NodeType.INITIAL,
            );

            const centerX = window.innerWidth /2;
            const centerY = window.innerHeight /2;

            const flowPosition = screenToFlowPosition({
            x: centerX + (Math.random() - 0.5) * 200,
            y: centerY + (Math.random() - 0.5) * 200,
            });

            const newNode = {
                id: createId(),
                data: {},
                position: flowPosition,
                type: nodeType.type,
            };

            if (hasManualTrigger) {
                return [newNode];
            }
            
            return [...nodes, newNode];
         });
         onOpenChange(false);
    },[
        setNodes,
        getNodes,
        onOpenChange,
        screenToFlowPosition,
    ]);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>
                        Whaat triggers this workflow?
                    </SheetTitle>
                    <SheetDescription>
                        A trigger is a step that starts your workflow
                    </SheetDescription>
                </SheetHeader>
                    <div>
                        {triggerNodes.map((nodeType) => {
                            const Icon = nodeType.icon;
                            return (
                                <div
                                key={nodeType.type}
                                className="w-full justify-start h-auto py-5 py-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                                onClick={() =>  handleNodeSelect(nodeType)}
                                >
                                    <div className="flex items-center gap-6 w-full overflow-hidden" >
                                        {
                                            typeof Icon === "string" ? (
                                                <img 
                                                    src={Icon}
                                                    alt={nodeType.lable}
                                                    className=" size-5 object-contain rounded-sm"
                                                />
                                            ) : (
                                                <Icon className="size-5"/>
                                            )}
                                            <div className="flex flex-col items-start text-left">
                                               <span className="font-medium text-sm">
                                                 {nodeType.lable}
                                               </span> 
                                               <span className="text-xs text-muted-foreground">
                                                    {nodeType.description}
                                               </span>
                                            </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <Separator/>
                    <div>
                        {executionNodes.map((nodeType) => {
                            const Icon = nodeType.icon;
                            return (
                                <div
                                key={nodeType.type}
                                className="w-full justify-start h-auto py-5 py-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                                onClick={() => handleNodeSelect(nodeType)}
                                >
                                    <div className="flex items-center gap-6 w-full overflow-hidden" >
                                        {
                                            typeof Icon === "string" ? (
                                                <img 
                                                    src={Icon}
                                                    alt={nodeType.lable}
                                                    className=" size-5 object-contain rounded-sm"
                                                />
                                            ) : (
                                                <Icon className="size-5"/>
                                            )}
                                            <div className="flex flex-col items-start text-left">
                                               <span className="font-medium text-sm">
                                                 {nodeType.lable}
                                               </span> 
                                               <span className="text-xs text-muted-foreground">
                                                    {nodeType.description}
                                               </span>
                                            </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </SheetContent>

        </Sheet>
    )
}