---
layout: docs_page
title: Inline Hooks
category: management
excerpt: The Inline Hooks Management API provides a CRUD interface for registering inline hook endpoints.
---

# Inline Hooks Management API 

{% api_lifecycle ea %}

For general information on inline hooks and how to create them, see [Inline Hooks](/use_cases/inline_hooks/). Documented here is the management API, which provides a CRUD interface for registering inline hooks, as well as a way to manually trigger invocation of an inline hook for testing purposes. This management API is not used for ongoing invocation of inline hook calls after they are registered, and is not related to he API contract defined for inline hook requests and responses; for information on all those topics, see [Inline Hooks](/use_cases/inline_hooks/).

## Getting Started

Explore the Inline Hooks Management API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b9651dc833b18e4c4666){:target="_blank"}

## Inline Hook Operations

### Create Inline Hooks

{% api_operation post /api/v1/inlineHooks%}

Register a new Inline Hook to your Organization in `ACTIVE` status. You need to pass an object in the JSON payload of your request, providing information on the inline hook you are registering. In the object, you need to supply:

 - The URL of your external service.
 - The type of the inline hook (Okta supports several different types of inline hooks).
 - The API key that you wish Okta to pass to your service when it calls it (so that your external service can check for the presence of the correct key as a security measure).

 The structure of the object is described below, in [Inline Hook Object](#inline-hook-object).

 Note that the API key you set here is a key for Okta to pass to your external service in an authorization header with each call it makes. It is unrelated to the Okta API token you must supply when making calls to Okta APIs.

 You can optionally specify extra headers that you wish Okta to pass to your external service in each call.

#### Request Parameters

| Parameter   | Description          | Param Type | DataType                                  | Required |
|-------------|----------------------|------------|-------------------------------------------|----------|
| Inline Hook | A valid Inline Hook. | Body       | [Inline Hook object](#inline-hook-object) | TRUE     |

#### Response Parameters

The response is an [Inline Hook Object](#inline-hook-object) representing the inline hook that was registered. The `id` property in the response serves as a unique ID for the inline hook, which you can specify when invoking other CRUD operations.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTPS",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://127.0.0.1:4567/inlineHooks",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
                "value" : "${api-key}"
            }
        }
    }
}' "https://{yourOktaDomain}/api/v1/inlineHooks"
~~~

> Note: `X-Other-Header` is an example of an additional header, which you can optionally specify. For each additional optional header, you choose the name and value you wish Okta to pass.

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "calr0dvWvbMQJHZCM0g3",
    "status": "ACTIVE",
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTPS",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://127.0.0.1:4567/inlineHooks",
            "method" : "POST",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
~~~

> Note: The 'channel.authScheme.value' property is write-only. You set it in your request, but it is never returned in the response, since it represents the secret value of the API key that you want Okta to pass to your external service. 

### Get Inline Hook

{% api_operation get /api/v1/inlineHooks/${inlineHookId} %}

#### Request Parameters

| Parameter      | Description             | Param Type | DataType | Required |
|----------------|-------------------------|------------|----------|----------|
| `inlineHookId` | A valid Inline Hook ID. | Path       | String   | TRUE     |

#### Response Parameters

The response is an [Inline Hook Object](#inline-hook-object) representing the registered inline hook that matches the `inlineHookId` you specified.

##### Request Example
{:.api .api-request .api-request-example}

~~~json
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/inlineHooks/${inlineHookId}"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "cali2j192cIE9VpHn0h7",
    "status": "ACTIVE",
    "name": "Test Inline Hook",
    "type": "com.okta.oauth2.tokens.transform",
    "version": "1.0.0",
    "channel": {
        "type": "HTTPS",
        "version": "1.0.0",
        "config": {
            "uri": "https://127.0.0.1:4567/inlineHooks",
            "headers": [
                {
                    "key": "X-Other-Header",
                    "value": "some-other-value"
                }
            ],
            "method": "POST",
            "authScheme": {
                "type": "HEADER",
                "key": "Authorization",
            }
        }
    },
    "created": "2018-12-05T00:35:20.000Z",
    "lastUpdated": "2018-12-05T00:35:20.000Z"
}
~~~

### List Inline Hooks

{% api_operation get /api/v1/inlineHooks%}

| Parameter        | Description              | Param Type | DataType | Required |
|------------------|--------------------------|------------|----------|----------|
| `inlineHookType` | The type of inline hook. | Query      | String   | FALSE    |

All responses return a list of Inline Hooks, filtered by the optional `inlineHookType` query parameter.

##### Request Example
{:.api .api-request .api-request-example}

~~~json
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/inlineHooks"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
[
	{
	    "id": "cali2j192cIE9VpHn0h7",
	    "status": "ACTIVE",
	    "name": "Test Inline Hook",
	    "type": "com.okta.oauth2.tokens.transform",
	    "version": "1.0.0",
	    "channel": {
	        "type": "HTTPS",
	        "version": "1.0.0",
	        "config": {
	            "uri": "https://127.0.0.1:4567/inlineHooks",
	            "headers": [
	                {
	                    "key": "X-Other-Header",
	                    "value": "some-other-value"
	                }
	            ],
	            "method": "POST",
	            "authScheme": {
	                "type": "HEADER",
	                "key": "Authorization",
	            }
	        }
	    },
	    "created": "2018-12-05T00:35:20.000Z",
	    "lastUpdated": "2018-12-05T00:35:20.000Z"
	}
]
~~~

### Update Inline Hook

{% api_operation put /api/v1/inlineHooks/${inlineHookId} %}

#### Request Parameters

| Parameter    | Description                                                                   | Param Type | DataType                                  | Required |
|--------------|-------------------------------------------------------------------------------|------------|-------------------------------------------|----------|
| inlineHookId | The ID of the inline hook you want to update.                                 | Path       | String                                    | TRUE     |
| inlineHook   | An `inlineHook` object representing the updated properties you wish to apply. | Body       | [Inline Hook Object](#inline-hook-object) | TRUE     |

The submitted inline hook object will replace the existing object after passing validation. Note that some properties are immutable: reefer to the [Inline Hook Object](#inline-hook-object) description of each property.

#### Response Parameters

The response is an [Inline Hook Object](#inline-hook-object) representing the updated inline hook.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTPS",
        "version" : "1.0.0",
        "config" : {
            "uri" : "HTTPS://127.0.0.1:8080/inlineHooks",
            "method" : "POST",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
                "value" : "${api-key}"
            }
        }
    }
}' "https://{yourOktaDomain}/api/v1/inlineHooks"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "calr0dvWvbMQJHZCM0g3",
    "status": "ACTIVE",
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTPS",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://127.0.0.1:8080/inlineHooks",
            "method" : "POST",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
~~~

### Delete Inline Hook

{% api_operation delete /api/v1/inlineHooks/${inlinHookId} %}

#### Request Parameters

| Parameter      | Description             | Param Type | DataType | Required |
|----------------|-------------------------|------------|----------|----------|
| `inlineHookId` | A valid Inline Hook ID. | Path       | String   | TRUE     |

Deletes the inline hook matching the provided `inlineHookId`. Once deleted, the inline hook is unrecoverable. As a safety precaution, only inline hooks with a status of `INACTIVE` are eligible for deletion. To change an inline hook to that status, use an [Update Inline Hook](#update-inline-hook) call, setting the `status` property in the [Inline Hook Object](#inline-hook-object) that you pass in the body of the request.

#### Response Parameters

All responses will return a 204 status with no content.

##### Request Example
{:.api .api-request .api-request-example}

~~~json
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/inlineHook/${inlineHookId}"
~~~

##### Response Example
{:.api .api-response .api-response-example}

204 with no content.

### Execute Inline Hook

{% api_operation post /api/v1/inlineHooks/${inlineHookId}/execute %}

| Parameter                     | Description                                                         | Param Type | DataType | Required |
|-------------------------------|---------------------------------------------------------------------|------------|----------|----------|
| inlineHookId                  | A valid Inline Hook ID.                                             | Path       | String   | TRUE     |
| Payload to send to external service. | JSON that matches the data contract of the  `inlineHookType` of this inline hook. | Body       | JSON     | TRUE     |

Executes the Inline Hook matching the provided `inlineHookId` using the request body as the input. This will send the provided data through the Channel and return a response if it matches the correct data contract. Otherwise it will throw
an error.

Inline Hook execution will enforce a timeout of 3 seconds on all outbound requests and will retry once in the event of a timeout or an error response from the remote system. If a successful response has not been received after that it will return a 400 error with more information about what failed.

Note that this execution endpoint is not tied to any other functionality in Okta and should only be used for testing purposes. 

#### Response Parameters

Successful responses will return the full response from the Inline Hook execution, which will match the data contract for
the given `inlineHookType` and version.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '
{  
   "source":"https://{yourOktaDomain}/oauth2/default/v1/authorize",
   "eventId":"3OWo4oo-QQ-rBWfRyTmQYw",
   "eventTime":"2019-01-15T23:20:47.000Z",
   "data":{  
      "context":{  
         "request":{  
            "id":"reqv66CbCaCStGEFc8AdfS0ng",
            "method":"GET",
            "url":{  
               "value":"https://{yourOktaDomain}/oauth2/default/v1/authorize?scope=openid+profile+email&response_type=token+id_token&redirect_uri=https%3A%2F%2Fhttpbin.org%2Fget&state=foobareere&nonce=asf&client_id=customClientIdNative"
            },
            "ipAddress":"127.0.0.1"
         },
         "protocol":{  
            "type":"OAUTH2.0",
            "request":{  
               "scope":"openid profile email",
               "state":"foobareere",
               "redirect_uri":"https://httpbin.org/get",
               "response_mode":"fragment",
               "response_type":"token id_token",
               "client_id":"customClientIdNative"
            },
            "issuer":{  
               "uri":"https://{yourOktaDomain}/oauth2/default"
            },
            "client":{  
               "id":"customClientIdNative",
               "name":"Native client",
               "type":"PUBLIC"
            }
         },
         "session":{  
            "id":"102Qoe7t5PcRnSxr8j3I8I6pA",
            "userId":"00uq8tMo3zV0OfJON0g3",
            "login":"administrator1@clouditude.net",
            "createdAt":"2019-01-15T23:17:09.000Z",
            "expiresAt":"2019-01-16T01:20:46.000Z",
            "status":"ACTIVE",
            "lastPasswordVerification":"2019-01-15T23:17:09.000Z",
            "amr":[  
               "PASSWORD"
            ],
            "idp":{  
               "id":"00oq6kcVwvrDY2YsS0g3",
               "type":"OKTA"
            },
            "mfaActive":false
         },
         "user":{  
            "id":"00uq8tMo3zV0OfJON0g3",
            "passwordChanged":"2018-09-11T23:19:12.000Z",
            "profile":{  
               "login":"administrator1@clouditude.net",
               "firstName":"Add-Min",
               "lastName":"O'Cloudy Tud",
               "locale":"en",
               "timeZone":"America/Los_Angeles"
            },
            "_links":{  
               "groups":{  
                  "href":"https://{yourOktaDomain}/00uq8tMo3zV0OfJON0g3/groups"
               },
               "factors":{  
                  "href":"https://{yourOktaDomain}/api/v1/users/00uq8tMo3zV0OfJON0g3/factors"
               }
            }
         },
         "policy":{  
            "id":"00pq8lGaLlI8APuqY0g3",
            "rule":{  
               "id":"0prq8mLKuKAmavOvq0g3"
            }
         }
      },
      "identity":{  
         "claims":{  
            "sub":"00uq8tMo3zV0OfJON0g3",
            "name":"Add-Min O'Cloudy Tud",
            "email":"webmaster@clouditude.net",
            "ver":1,
            "iss":"https://{yourOktaDomain}/oauth2/default",
            "aud":"customClientIdNative",
            "jti":"ID.YxF2whJfB3Eu4ktG_7aClqtCgjDq6ab_hgpiV7-ZZn0",
            "amr":[  
               "pwd"
            ],
            "idp":"00oq6kcVwvrDY2YsS0g3",
            "nonce":"asf",
            "preferred_username":"administrator1@clouditude.net",
            "auth_time":1547594229
         },
         "token":{  
            "lifetime":{  
               "expiration":3600
            }
         }
      },
      "access":{  
         "claims":{  
            "ver":1,
            "jti":"AT.W-rrB-z-kkZQmHW0e6VS3Or--QfEN_YvoWJa46A7HAA",
            "iss":"https://{yourOktaDomain}/oauth2/default",
            "aud":"api://default",
            "cid":"customClientIdNative",
            "uid":"00uq8tMo3zV0OfJON0g3",
            "sub":"administrator1@clouditude.net",
            "firstName":"Add-Min",
            "preferred_username":"administrator1@clouditude.net"
         },
         "token":{  
            "lifetime":{  
               "expiration":3600
            }
         },
         "scopes":{  
            "openid":{  
               "id":"scpq7bW1cp6dcvrz80g3",
               "action":"GRANT"
            },
            "profile":{  
               "id":"scpq7cWJ81CIP5Qkr0g3",
               "action":"GRANT"
            },
            "email":{  
               "id":"scpq7dxsoz6LQlRj00g3",
               "action":"GRANT"
            }
         }
      }
   },
   "eventTypeVersion":"1.0",
   "cloudEventVersion":"0.1",
   "contentType":"application/json",
   "eventType":"com.okta.oauth2.tokens.transform"
}
' "https://{yourOktaDomain}/api/v1/inlineHooks/${inlineHookId}/execute"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json

{
    "commands":
    [{
      "type": "com.okta.tokens.id_token.patch",
      "value":
        [
          {
            "op": "add",
            "path": "/claims/extPatientId",
            "value": "1234"
          }
        ]
      },
      {
      "type": "com.okta.tokens.access_token.patch",
      "value":
        [
          {
            "op": "add",
            "path": "/claims/external_guid",
            "value": "F0384685-F87D-474B-848D-2058AC5655A7"
          }
        ]
      }
  ],
    "debugContext":
    {
        "lookAtMe": "hiThere"
    }
}
~~~

### Inline Hook Object

| Property    | Description                                                                                       | DataType       | Nullable | Unique | ReadOnly | Validation                                        |
|-------------|---------------------------------------------------------------------------------------------------|----------------|----------|--------|----------|---------------------------------------------------|
| id          | Unique key for the Inline Hook.                                                                   | String         | FALSE    | TRUE   | TRUE     | Assigned                                          |
| status      | Status of the Inline Hook. `INACTIVE` will block execution.                                       | String         | FALSE    | FALSE  | FALSE    | Must be either `ACTIVE` or `INACTIVE`.            |
| name        | Display name for Inline Hook.                                                                     | String         | FALSE    | TRUE   | FALSE    | Must be between 1 and 255 characters in length.   |
| type        | Type of the Inline Hook. See list of [Supported Inline Hook Types](#supported-inline-hook-types). | inlineHookType | FALSE    | FALSE  | TRUE     | Immutable after Inline Hook creation.             |
| version     | Version of the Channel.                                                                           | Integer        | FALSE    | FALSE  | TRUE     | Must match a valid version number.                |
| Channel object    | Properties of the communications channel used to contact your external Service.                                                                     | [Channel](#channel-object) object        | FALSE    | FALSE  | FALSE    | Validation is determined by the specific Channel. |
| created     | Date of Inline Hook creation.                                                                     | Date           | TRUE     | FALSE  | TRUE     | Assigned                                          |
| lastUpdated | Date of Inline Hook update.                                                                       | Date           | TRUE     | FALSE  | TRUE     | Assigned                                          |
{:.table .table-word-break} 

~~~json
{
    "id": "calr0dvWvbMQJHZCM0g3",
    "status": "ACTIVE",
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTPS",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://127.0.0.1:8080/inlineHooks",
            "method" : "POST",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
~~~

### Channel Object




### Supported Inline Hook Types

When registering an inline hook, you need to specify what type it is. The following types are currently supported:

| Type Value                         | Name                                                                                            |
|------------------------------------|-------------------------------------------------------------------------------------------------|
| `com.okta.oauth2.tokens.transform` | [Token Inline Hook](/use_cases/inline_hooks/token_hook/token_hook)   |
| `com.okta.import.transform`        | [Import Inline Hook](/use_cases/inline_hooks/import_hook/import_hook) |
