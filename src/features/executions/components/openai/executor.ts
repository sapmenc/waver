import Handlebars from "handlebars";
import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import {createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { openaiChannel } from "@/inngest/channels/openai";
import prisma from "@/lib/db";


Handlebars.registerHelper("json", (context) =>{
    const jsonString = JSON.stringify(context, null , 2);
    const SafeString = new Handlebars.SafeString(jsonString);

    return SafeString;
});

type OpenAiData = {
    variableName?: string;
    credentialId?: string;
    systemPrompt?: string;
    userPrompt?: string;
};

export const openAiExecutor: NodeExecutor<OpenAiData> = async({
    data,
    nodeId,
    context,
    step,
    publish,
}) => {
    await publish(
        openaiChannel().status({
            nodeId,
            status: "loading",
        }),
    );

    if (!data.variableName) {
        await publish(
            openaiChannel().status({
                nodeId, 
                status: "error",
            }),
        );
        throw new NonRetriableError("OpenAI node: variable name is missing");
    }

    if(!data.credentialId) {
        await publish(
            openaiChannel().status({
                nodeId,
                status: "error",
            }),
        );
            throw new NonRetriableError("OpenAI node: Credential is required");

    }
    if (!data.userPrompt) {
        await publish(
            openaiChannel().status({        
                nodeId,
                status: "error",
            }),
        );
        throw new NonRetriableError("OpenAI node: user prompt is missing");
    }

    //TODO: throw if credentials are missing

    const systemPrompt = data.systemPrompt
        ? Handlebars.compile(data.systemPrompt)(context)
        : "You are a helpful assistant.";
    const userPrompt = Handlebars.compile(data.userPrompt)(context);

    const credential = await step.run("get-credential", () => {
        return prisma.credential.findUnique({
            where:{
                id: data.credentialId,
            },
        });
    });

    if (!credential) {
        throw new NonRetriableError("OpenAI node: Credential not found");
    }

    const openai = createOpenAI({
        apiKey: credential.value,
    });
    try {
        const {steps} = await step.ai.wrap(
            "openai-generate-text",
            generateText,
            {
                model: openai("gpt-4"),
                system: systemPrompt,
                prompt: userPrompt,
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true,
                },
            },
        )    
        const text = 
            steps[0].content[0].type === "text"
                ? steps[0].content[0].text
                : "";
        await publish(
            openaiChannel().status({
                nodeId,
                status: "success",
            }),
        );   
        
        return {
            ...context,
            [data.variableName]:{
                text,
            },
        };
    } catch (error) {
        await publish(
            openaiChannel().status({
                nodeId,
                status: "error",
            }),
        );
        throw error;
    }
};