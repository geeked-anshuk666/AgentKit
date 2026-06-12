const flowConfig = {
  "id": "8bf81f63-83e1-4946-8f48-54bfae5c97a3",
  "name": "Candidate Screener",
  "nodes": [
    {
      "id": "triggerNode_1",
      "data": {
        "nodeId": "graphqlNode",
        "values": {
          "nodeName": "API Request",
          "responeType": "realtime",
          "advance_schema": ""
        },
        "trigger": true
      },
      "type": "triggerNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "scraperNode_352",
      "data": {
        "nodeId": "scraperNode",
        "values": {
          "url": "{{triggerNode_1.output.url}}",
          "mobile": false,
          "waitFor": 123,
          "nodeName": "Scraper",
          "credentials": "FIRECRAWL_API_KEY",
          "excludeTags": [],
          "includeTags": [],
          "onlyMainContent": true,
          "skipTLsVerification": false
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "agentClassifierNode_511",
      "data": {
        "nodeId": "agentClassifierNode",
        "values": {
          "prompts": [
            {
              "id": "187c2f4b-c23d-4545-abef-73dc897d6b7b",
              "role": "system",
              "content": "The candidate has filled the about you and why you section for a job recruitment with job description as follows To recruit the best candidates for the Next.js developer’s role, it is vital to adequately list the required experience and duties. The expectations for the given position may vary, as they may be expanded depending on the role, in other words, entry\\-level, mid\\-level, or senior Next.js developer’s position. Thus, a precise enumeration of job responsibilities and qualifications will help ensure that the applicants meet the job requirements for the Next.js developer role to a greater extent.\n\nAs a Next.JS developer, your responsibilities will be:\n\n1. Creating high\\-performance web applications and maintaining them.\n2. Designing server\\-side rendered React applications and implementing optimized client\\-side rendering.\n3. Effective integration with APIs and various databases.\n4. Write clean and efficient code.\n5. Coordinate activities with cross\\-functional teams for efficient user experiences.\n6. Possesses problem\\-solving skills and a deep understanding of JavaScript and React framework.\n\nScraping the github of candidate we got : {{scraperNode_669.output.markdown}}\n\nThe candidate has also filled following details about himself : {{triggerNode_1.output.aboutYou}}\n\nBased on the above, classify whether the candidate is potential candidate or not at the moment."
            }
          ],
          "nodeName": "Classifier",
          "classifier": [
            {
              "label": "Selected",
              "value": "agentClassifierNode_818-addNode_161"
            },
            {
              "label": "Rejected",
              "value": "agentClassifierNode_818-addNode_164"
            }
          ],
          "generativeModelName": {}
        }
      },
      "type": "agentClassifierNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "LLMNode_366",
      "data": {
        "nodeId": "LLMNode",
        "values": {
          "tools": [],
          "prompts": [
            {
              "id": "187c2f4b-c23d-4545-abef-73dc897d6b7b",
              "role": "system",
              "content": "Generate an email for candidate sharing him insights where he lacks based on our job description.\n\nThe candidate has filled the about you and why you section for a job recruitment with job description as follows To recruit the best candidates for the Next.js developer’s role, it is vital to adequately list the required experience and duties. The expectations for the given position may vary, as they may be expanded depending on the role, in other words, entry\\-level, mid\\-level, or senior Next.js developer’s position. Thus, a precise enumeration of job responsibilities and qualifications will help ensure that the applicants meet the job requirements for the Next.js developer role to a greater extent.\n\nThe job description states that as a Next.JS developer, your responsibilities will be:\n\n1. Creating high\\-performance web applications and maintaining them.\n2. Designing server\\-side rendered React applications and implementing optimized client\\-side rendering.\n3. Effective integration with APIs and various databases.\n4. Write clean and efficient code.\n5. Coordinate activities with cross\\-functional teams for efficient user experiences.\n6. Possesses problem\\-solving skills and a deep understanding of JavaScript and React framework.\n\nJust write the email without any subject and just write the body on the email.\n\nHis github: {{scraperNode_669.output.markdown}} and {{scraperNode_669.output.html}}"
            }
          ],
          "memories": null,
          "messages": null,
          "nodeName": "Generate Text",
          "generativeModelName": null
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "LLMNode_490",
      "data": {
        "nodeId": "LLMNode",
        "values": {
          "tools": [],
          "prompts": [
            {
              "id": "187c2f4b-c23d-4545-abef-73dc897d6b7b",
              "role": "system",
              "content": "Generate an email for candidate sharing him insights where he lacks based on our job description.\n\nThe candidate has filled the about you and why you section for a job recruitment with job description as follows To recruit the best candidates for the Next.js developer’s role, it is vital to adequately list the required experience and duties. The expectations for the given position may vary, as they may be expanded depending on the role, in other words, entry\\-level, mid\\-level, or senior Next.js developer’s position. Thus, a precise enumeration of job responsibilities and qualifications will help ensure that the applicants meet the job requirements for the Next.js developer role to a greater extent.\n\nThe job description states that as a Next.JS developer, your responsibilities will be:\n\n1. Creating high\\-performance web applications and maintaining them.\n2. Designing server\\-side rendered React applications and implementing optimized client\\-side rendering.\n3. Effective integration with APIs and various databases.\n4. Write clean and efficient code.\n5. Coordinate activities with cross\\-functional teams for efficient user experiences.\n6. Possesses problem\\-solving skills and a deep understanding of JavaScript and React framework.\n\nJust write the email without any subject and just write the body on the email.\n\nHis github: {{scraperNode_669.output.markdown}} and {{scraperNode_669.output.html}}"
            }
          ],
          "memories": null,
          "messages": null,
          "nodeName": "Generate Text",
          "generativeModelName": null
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "apiNode_413",
      "data": {
        "nodeId": "apiNode",
        "values": {
          "url": "https://dhruvlamatic.app.n8n.cloud/webhook/9ed5e934-205e-4383-b783-60049c112985",
          "body": "{\n    \"email\" : {{triggerNode_1.output.email}},\n    \"content\" : {{LLMNode_366.output.generatedResponse}}\n}",
          "method": "POST",
          "headers": "",
          "retries": "0",
          "nodeName": "API",
          "retry_deplay": "0"
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "apiNode_443",
      "data": {
        "nodeId": "apiNode",
        "values": {
          "url": "https://dhruvlamatic.app.n8n.cloud/webhook/9ed5e934-205e-4383-b783-60049c112985",
          "body": "{\n    \"email\" : {{triggerNode_1.output.email}},\n    \"content\" : {{LLMNode_490.output.generatedResponse}}\n}",
          "method": "POST",
          "headers": "",
          "retries": "0",
          "nodeName": "API",
          "retry_deplay": "0"
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "graphqlResponseNode_921",
      "data": {
        "nodeId": "graphqlResponseNode",
        "values": {
          "nodeName": "API Response",
          "outputMapping": "{\n  \"email\": \"{{triggerNode_1.output.email}}\",\n  \"status\": \"{{agentClassifierNode_511.output.class}}\"\n}"
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    }
  ],
  "edges": [
    {
      "id": "triggerNode_1-scraperNode_352",
      "type": "defaultEdge",
      "source": "triggerNode_1",
      "target": "scraperNode_352",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "scraperNode_352-agentClassifierNode_511",
      "type": "defaultEdge",
      "source": "scraperNode_352",
      "target": "agentClassifierNode_511",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "agentClassifierNode_818-addNode_161",
      "data": {
        "condition": "Selected"
      },
      "type": "agentClassifierEdge",
      "source": "agentClassifierNode_511",
      "target": "LLMNode_366",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "agentClassifierNode_818-addNode_164",
      "data": {
        "condition": "Rejected"
      },
      "type": "agentClassifierEdge",
      "source": "agentClassifierNode_511",
      "target": "LLMNode_490",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "LLMNode_366-apiNode_413",
      "type": "defaultEdge",
      "source": "LLMNode_366",
      "target": "apiNode_413",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "LLMNode_490-apiNode_443",
      "type": "defaultEdge",
      "source": "LLMNode_490",
      "target": "apiNode_443",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "apiNode_413-graphqlResponseNode_921",
      "type": "defaultEdge",
      "source": "apiNode_413",
      "target": "graphqlResponseNode_921",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "apiNode_443-graphqlResponseNode_921",
      "type": "defaultEdge",
      "source": "apiNode_443",
      "target": "graphqlResponseNode_921",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "response-graphqlResponseNode_921",
      "type": "responseEdge",
      "source": "triggerNode_1",
      "target": "graphqlResponseNode_921",
      "sourceHandle": "to-response",
      "targetHandle": "from-trigger"
    }
  ],
  "status": "active",
  "created_at": "2026-06-12T18:42:45.627391+00:00"
};

export async function getNodesAndEdges(): Promise<{
    nodes: Record<string, any>[],
    edges: Record<string, any>[],
}> {
    return {
        nodes: flowConfig.nodes,
        edges: flowConfig.edges,
    }
}

export async function getFlowConfig(): Promise<Record<string, any>> {
    return flowConfig;
}