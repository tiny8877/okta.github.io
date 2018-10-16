---
layout: docs_page
title: Extensibility
category: management
excerpt: The Extensibility APIis provides a CRUD and execution interface for Callbacks and Webhooks.
---


# Callbacks API 

{% api_lifecycle beta %}

The Callbacks API provides a CRUD interface for Callbacks in the system as well as a way to test Callbacks outside of 
their normal uses in the product to assess performance and compatibility.

## Callback Operations

### Create Callback

***POST*** /api/v1/callbacks

Adds a new Callback to your Organization in an ACTIVE status

#### Request Parameters

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| callback  | A valid Callback                                                                       | Body       | Callback Model                    | TRUE     |         |

#### Response Parameters

All responses return the created Callback

### Get Callback

***GET*** /api/v1/callbacks/**:callbackId**

#### Request Parameters

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| callbackId  | A valid Callback id                                                                  | Path       | String                            | TRUE     |         |

#### Response Parameters

All responses return the Callback that matches the callbackId provided

### List Callbacks

***GET*** /api/v1/callbacks

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| type      | A valid CallbackType name                                                              | Query      | Enum                              | FALSE    |         |

All responses return a list of Callbacks, filtered by the optional type query parameter

### Update Callback

***PUT*** /api/v1/callbacks/**:callbackId**

#### Request Parameters

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| callbackId  | A valid Callback id                                                                  | Path       | String                            | TRUE     |         |
| callback  | A valid Callback                                                                       | Body       | Callback Model                    | TRUE     |         |

The submitted Callback will replace the existing version after passing validation. Refer to the above models to see
which properties are immutable.

#### Response Parameters

All responses return the updated Callback

### Delete Callback

***DELETE*** /api/v1/callbacks/**:callbackId**

#### Request Parameters

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| callbackId  | A valid Callback id                                                                   | Path       | String                            | TRUE     |         |

Deletes the Callback matching the provided callbackId. Once deleted, this Callback will be unrecoverable.
As a safety precaution, only Callbacks with a status of INACTIVE are eligible for deletion.

#### Response Parameters

All responses will return a 204 with no content

### Execute Callback

***POST*** /api/v1/callbacks/**:callbackId**/execute

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| callbackId  | A valid Callback id                                                                  | Path       | String                            | TRUE     |         |
| CallbackType-specific input | JSON that matches the data contract of the linked CallbackType       | Body       | JSON                              | TRUE     |         |

Executes the Callback matching the provided callbackId using the request body as the input. This will send the provided
data through the CallbackChannel and return a response if it matches the correct data contract. Otherwise it will throw
an error.

Callback execution will enforce a timeout of 3 seconds on all outbound requests and will retry once in the event of a
timeout or an error response from the remote system. If a successful response has not been received after that it will 
return a 400 error with more information about what failed.

Note that this execution is NOT tied to any other functionality in Okta and should only be used for testing purposes. 

#### Response Parameters

Successful responses will return the full response from the Callback execution, which will match the data contract for
the given CallbackType and version.

## Callback Registry

This section contains all CallbackTypes and CallbackChannels that exist in the system along with their associated data 
contracts

### CallbackType Data Contracts

#### TEST v1

Only used for testing purposes, there are no production flows that use this

##### CallbackType

```json
{
    "name" : "TEST",
    "version" : "1.0.0"
}
```
##### Input Example

```json
{
    "testField" : "some string",
    "testInt" : 9,
    "testDate" : "2018-03-03T00:00:00Z",
    "testBoolean" : true
}
```

##### Output Example

```json
{
    "testBoolean" : true,
    "testString" : "some result"
}
```

#### TEST v2

Only used for testing purposes, there are no production flows that use this

##### CallbackType

```json
{
    "name" : "TEST",
    "version" : 2
}
```
##### Input Example

```json
{
    "testMap" : {
        "key1" : 1,
        "key2" : 2
    },
    "testList" : [
        "foo",
        "bar",
        "baz"
    ]
}
```

##### Output Example

```json
{
    "testMap" : {
        "key1" : true,
        "key2" : false
    },
    "testList" : [
        "foo",
        "bar",
        "baz"
    ]
}
```

#### TEST2 v1

Only used for testing purposes, there are no production flows that use this

##### CallbackType

```json
{
    "name" : "TEST2",
    "version" : "1.0.0"
}
```
##### Input Example

```json
{
    "testField" : "some string",
    "testInt" : 9,
    "testDate" : "2018-03-03T00:00:00Z",
    "testBoolean" : true
}
```

##### Output Example

```json
{
    "testBoolean" : true,
    "testString" : "some result"
}
```

#### TEST2 v2

Only used for testing purposes, there are no production flows that use this

##### CallbackType

```json
{
    "name" : "TEST2",
    "version" : 2
}
```
##### Input Example

```json
{
    "testMap" : {
        "key1" : 1,
        "key2" : 2
    },
    "testList" : [
        "foo",
        "bar",
        "baz"
    ]
}
```

##### Output Example

```json
{
    "testMap" : {
        "key1" : true,
        "key2" : false
    },
    "testList" : [
        "foo",
        "bar",
        "baz"
    ]
}
```

### CallbackChannel Data Contracts

#### HTTP v1

##### CallbackChannel

```json
{
    "type" : "HTTP",
    "version" : "1.0.0",
    "config" : {
        "uri" : "https://frinkiac.com/api/search",
        "headers" : [
            {
                "key" : "X-Other-Header",
                "value" : "some-other-value"
            }
        ],
        "method" : "POST",
        "authScheme" : {
            "type" : "HEADER",
            "key" : "x-api-key",
            "value" : "*****"
        }    
    }
}
```

##### Config Object

```json
{
    "uri" : "https://frinkiac.com/api/search",
    "headers" : [
        {
            "key" : "X-Other-Header",
            "value" : "some-other-value"
        }    
    ],
    "method" : "POST",
    "authScheme" : {
        "type" : "HEADER",
        "key" : "x-api-key",
        "value" : "*****"
    }
}

```

| Property        | Description           | DataType  | Nullable | Unique | ReadOnly | MinLength | MaxLength | Validation |
|-----------------|-----------------------|-----------|----------|--------|----------|-----------|-----------|------------|
| uri             | URI the Callback input should be requested | URI | FALSE | FALSE | TRUE | 1 | 1024 | Must begin with https://, immutable after set |
| headers         | List of key/value pairs for headers that should be sent with the Callback request | Map | FALSE | FALSE | FALSE | | |We disallow some reserved headers such as `X-Okta-Verification-Token` |
| method          | The HTTP method to use | Enum | FALSE (Defaults to POST) | FALSE | FALSE | | | |
| authScheme      | The authentication scheme to use for this request | AuthScheme | FALSE | FALSE | FALSE | | | |  

The config object follows special validation rules in that the uri field is immutable after creation. This is to prevent
the accidental breakage of working Callbacks. To change the URI, create a new Callback, test it, and then update your 
use-case to point to the new one.

Also note that the "value" properties in the headers elements will be returned in an obfuscated form through the API. 
These are stored encrypted within Okta and will only be decrypted when executing the Callback 
 
##### AuthScheme Object

```json
{
    "type" : "HEADER",
    "key" : "x-api-key",
    "value" : "*****"
}


```

| Property        | Description           | DataType  | Nullable | Unique | ReadOnly | MinLength | MaxLength | Validation |
|-----------------|-----------------------|-----------|----------|--------|----------|-----------|-----------|------------|
| type            | The type of the authentication scheme | Enum | FALSE | FALSE | TRUE |  | |  "HEADER" |
| key             | The header name | String | FALSE | FALSE | FALSE | | | |
| value           | The header value | String | FALSE | FALSE | FALSE | | | |

The authentication scheme object describes how to authenticate the callback requests.  
 
Also note that the "value" properties in the headers elements will be returned in an obfuscated form through the API. 
These are stored encrypted within Okta and will only be decrypted when executing the Callback 

## Models

### CallbackType Model

Every Callback has a CallbackType that points to the data contract it will support at execution time.
All CallbackTypes are versioned and each version may support a different data contract.

#### Example

```json
{
    "name" : "TEST",
    "version" : "1.0.0"
}
```

For a full list of CallbackTypes and their data contracts, see the CallbackType Data Contracts section

#### CallbackType Properties

| Property        | Description           | DataType  | Nullable | Unique | ReadOnly | MinLength | MaxLength | Validation |
|-----------------|-----------------------|-----------|----------|--------|----------|-----------|-----------|------------|
| name            | Name of the CallbackType | Enum   | FALSE    | FALSE  | TRUE     |           |           | One of TEST, TEST2 |
| version         | Version of the CallbackType | Integer | FALSE | FALSE | TRUE     |           |           | Must match a valid version number for the provided name |


### CallbackChannel Model

Every Callback has a CallbackChannel that defines how the Callback should send and receive data to a remote system.
Each CallbackChannel has a name, version, and config object. The name and version point to a schema for the config 
object.

#### Example

```json
{
    "type" : "HTTP",
    "version" : "1.0.0",
    "config" : {
        "uri" : "https://frinkiac.com/api/search",
        "headers" : [
            {
                "key" : "X-Other-Header",
                "value" : "some-other-value"
            }
        ],
        "method" : "POST",
        "authScheme" : {
            "type" : "HEADER",
            "key" : "x-api-key",
            "value" : "*****"
        }    
    }
}
```

For a full list of CallbackChannels and their data contracts, see the CallbackChannel Data Contracts section

#### CallbackChannel Properties

| Property        | Description           | DataType  | Nullable | Unique | ReadOnly | MinLength | MaxLength | Validation |
|-----------------|-----------------------|-----------|----------|--------|----------|-----------|-----------|------------|
| name            | Name of the CallbackChannel | Enum   | FALSE    | FALSE  | TRUE     |           |           | One of HTTP |
| version         | Version of the CallbackChannel | Integer | FALSE | FALSE | TRUE     |           |           | Must match a valid version number for the provided name |
| config          | Configuration data for the CallbackChannel | CallbackChannelConfig | FALSE | FALSE | FALSE | | | Validation is determined by the specific CallbackChannel |  
{:.table .table-word-break}

### Callback Model

#### Example

```json
{
    "id" : "calw0h9qx9AYZWARUDFP",
    "status" : "ACTIVE",
    "name" : "My Callback",
    "type" : {
        "name" : "TEST",
        "version" : "1.0.0"
    },
    "channel" : {
        "name" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://frinkiac.com/api/search",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "method" : "POST",
            "authScheme" : {
                "type" : "HEADER",
                "key" : "x-api-key",
                "value" : "*****"
            }        
        }
    },
    "debugging" : true,
    "debuggingStartTime" : "2018-03-01T00:00:00Z",
    "created" : "2018-02-25T00:00:00Z",
    "lastUpdated" : "2018-03-01T00:00:00Z"
}
```

#### Callback Model Properties

| Property        | Description           | DataType  | Nullable | Unique | ReadOnly | MinLength | MaxLength | Validation |
|-----------------|-----------------------|-----------|----------|--------|----------|-----------|-----------|------------|
| id              | Unique key for the Callback | String  | FALSE    | TRUE   | TRUE     |           |           |            |
| status          | Status of the Callback, INACTIVE will block execution | Enum | FALSE | FALSE | FALSE | | | One of ACTIVE, INACTIVE |
| name            | Display name for Callback | String | FALSE | TRUE | FALSE | 1 | 255 | | 
| type            | CallbackType for the Callback | CallbackType | FALSE | FALSE | TRUE | | | Immutable after Callback creation |
| channel         | CallbackChannel for the Callback | CallbackChannel | FALSE | FALSE | FALSE | | | Validation is determined by the specific CallbackChannel |
| debugging       | Indicates that debugging logs should be emitted for this Callback during execution | Boolean | TRUE | FALSE | FALSE | | | Okta will automatically change this to false after 60 minutes and null out the debuggingStartTime field |
| debuggingStartTime | The last time that debugging was enabled | Date | TRUE | FALSE | TRUE | | | |
| created         | Date of Callback creation | Date | TRUE | FALSE | TRUE | | | |
| lastUpdated     | Date of Callback update   | Date | TRUE | FALSE | TRUE | | | |
{:.table .table-word-break}

# Webhooks API 

{% api_lifecycle beta %}

The Webhooks API provides a CRUD interface for Webhooks in the system as well as a way to test Webhooks outside of 
their normal uses in the product to assess performance and compatibility.

## Models

### CallbackChannel Model

Every Webhook has a CallbackChannel identical to that described in the Callbacks API.  

#### Example

```json
{
    "type" : "HTTP",
    "version" : "1.0.0",
    "config" : {
        "uri" : "https://frinkiac.com/api/search",
        "headers" : [
            {
                "key" : "Authentication",
                "value" : "some-api-key"
            }
        ],
        "method" : "POST",
        "authScheme" : {
            "type" : "HEADER",
            "key" : "x-api-key",
            "value" : "*****"
        }
    }
}
```

For a full list of CallbackChannels and their data contracts, see the CallbackChannel Data Contracts section

#### CallbackChannel Properties

| Property        | Description           | DataType  | Nullable | Unique | ReadOnly | MinLength | MaxLength | Validation |
|-----------------|-----------------------|-----------|----------|--------|----------|-----------|-----------|------------|
| name            | Name of the CallbackChannel | Enum   | FALSE    | FALSE  | TRUE     |           |           | One of HTTP |
| version         | Version of the CallbackChannel | Integer | FALSE | FALSE | TRUE     |           |           | Must match a valid version number for the provided name |
| config          | Configuration data for the CallbackChannel | CallbackChannelConfig | FALSE | FALSE | FALSE | | | Validation is determined by the specific CallbackChannel |  
{:.table .table-word-break}

### Webhook Model

#### Example

```json
{
    "id" : "who2n0dw1o1lqkYdu0g7",
    "status" : "ACTIVE",
    "verification" : "VERIFIED",
    "name" : "My Webhook",
    "events" : [
      {
        "type" : "user.account.access_super_user_app"
      },
      {
        "type" : "user.session.start"
      }
    ],
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://frinkiac.com/api/search",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "method" : "POST",
            "authScheme" : {
              "type" : "HEADER",
              "key" : "x-api-key",
              "value" : "*****"
            }
        }
    },
    "created" : "2018-02-25T00:00:00Z",
    "lastUpdated" : "2018-03-01T00:00:00Z"
}
```

#### Webhook Model Properties

| Property        | Description           | DataType  | Nullable | Unique | ReadOnly | MinLength | MaxLength | Validation |
|-----------------|-----------------------|-----------|----------|--------|----------|-----------|-----------|------------|
| id              | Unique key for the Webhook | String  | FALSE    | TRUE   | TRUE     |           |           |            |
| status          | Status of the Webhook, INACTIVE will block execution | Enum | FALSE | FALSE | FALSE | | | One of ACTIVE, INACTIVE |
| name            | Display name for Webhook | String | FALSE | TRUE | FALSE | 1 | 255 | |
| events          | List of events to trigger the Webhook | Array of Events | FALSE | FALSE | FALSE | | | Event validation | 
| channel         | CallbackChannel for the Webhook | CallbackChannel | FALSE | FALSE | FALSE | | | Validation is determined by the specific CallbackChannel |
| created         | Date of Callback creation | Date | TRUE | FALSE | TRUE | | | |
| lastUpdated     | Date of Callback update   | Date | TRUE | FALSE | TRUE | | | |
{:.table .table-word-break} 

## Webhook Operations

### Create Webhook

***POST*** /api/v1/webhooks

Adds a new Webhook to your Organization in an ACTIVE status

#### Request Parameters

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| webhook   | A valid Webhook                                                                        | Body       | Webhook Model                     | TRUE     |         |

#### Response Parameters

All responses return the created Webhook

### Get Webhook

***GET*** /api/v1/webhooks/**:webhookId**

#### Request Parameters

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| webhookId | A valid Webhook id                                                                     | Path       | String                            | TRUE     |         |

#### Response Parameters

All responses return the Webhook that matches the webhookId provided

### List Webhooks

***GET*** /api/v1/webhooks

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| status    | Status of webhooks to list                                                             | Query      | Enum                              | FALSE    |         |

All responses return a list of Webhooks, filtered by the optional status query parameter

### Update Webhook

***PUT*** /api/v1/webhooks/**:webhookId**

#### Request Parameters

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| webhookId | A valid Webhook id                                                                     | Path       | String                            | TRUE     |         |
| webhook   | A valid Webhook                                                                        | Body       | Webhook Model                     | TRUE     |         |

The submitted Webhook will replace the existing version after passing validation. Refer to the above models to see
which properties are immutable.

#### Response Parameters

All responses return the updated Webhook

### Delete Webhook

***DELETE*** /api/v1/webhooks/**:webhookId**

#### Request Parameters

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| webhookId | A valid Webhook id                                                                     | Path       | String                            | TRUE     |         |

Deletes the Webhook matching the provided webhookId. Once deleted, this Webhook will be unrecoverable.
As a safety precaution, only Webhooks with a status of INACTIVE are eligible for deletion.

#### Response Parameters

All responses will return a 204 with no content

### Verify Webhook

***POST*** /api/v1/webhooks/**:webhookId**/verify

| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
|-----------|----------------------------------------------------------------------------------------|------------|-----------------------------------|----------|---------|
| webhookId | A valid Webhook id                                                                     | Path       | String                            | TRUE     |         |

Verifies the Webhook matching the provided webhookId. This will send a 
verification request through the specified channel.  If successful, it will 
update the Webhook "verified" field to "VERIFIED".

Calling this endpoint will cause Okta to make an HTTP GET request to the URI 
specified in the channel.config.uri section of the Webhook configuration.
The code running at that URI will need to return the validation payload as 
specified on the last part of this guide: [Webhooks Usage Guide](https://oktawiki.atlassian.net/wiki/spaces/eng/pages/538641789/Webhooks+Usage+Guide)

The VERIFICATION bit in the response will tell you if the verification 
succeeded. If it says "VERIFIED" you are all set to receive webhooks!

#### Response Parameters

All responses will return the verified (or not) Webhook.