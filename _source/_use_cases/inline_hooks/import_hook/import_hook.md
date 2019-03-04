---
layout: docs_page
title: Import Inline Hook
excerpt: Add custom logic to the user import process.

---

# Import Inline Hook

{% api_lifecycle ea %}

This page provides reference documentation for:

- JSON objects contained in the outbound request from Okta to your external service

- JSON objects you can include in your response

This information is specific to the Import Inline Hook, one type of inline hook supported by Okta.

## See Also

For a general introduction to Okta inline hooks, see [Inline Hooks](/use_cases/inline_hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/api/resources/inline-hooks).

For steps to enable this inline hook, see below, [Enabling an Import Inline Hook](#enabling-an-import-inline-hook).

## About

The Import Inline Hook enables you to add custom logic to the process of importing new users into Okta from an app. Your custom logic can modify user attributes, resolve uniqueness conflicts, and update the results of any matching rules that were applied.

## Objects in the Request from Okta

For the Import Inline Hook, the outbound call from Okta to your external service will include the following objects in its JSON payload:

### data.appUser.profile

Provides the attributes of the app profile of the user being imported.

### data.user.profile

Provides the attributes of the existing Okta user profile that matched the app user. Multiple instances of this object can be returned, if there were more than one possible Okta user profile matches.

### data.action.result

The current default action that Okta will take. The two possible values are:

- `CREATE_USER`: Create a new Okta user profile to assign this app user to.

- `LINK_USER`: Accept this app user as a match of the Okta user indicated in `data.user.profile`.

You can change the action that will be taken by means of the `commands` object you return.

## Objects in Response You Send

For the Token Inline hook, the `commands` and `error` objects that you can return in the JSON payload of your response are defined as follows:

### commands

| Property | Description                                           | Data Type       |
|----------|-------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands). | String          |
| value    | Operand to pass to the command.                       | [value](#value) |

#### Supported Commands

The following commands are supported for the Token Inline Hook type:

| Command                             | Description |
|-------------------------------------|-------------|
| com.okta.appUser.profile.update     |             |
| com.okta.user.profile.update.import |             |
| com.okta.action.update.import       |             |
| com.okta.action.update              |             |


#### value

The `value` object is where you specify the operand of the command.

### error

When you return an error object, it should have the following structure:

| Property     | Description                          | Data Type                   |
|--------------|--------------------------------------|-----------------------------|
| errorSummary | Human-readable summary of the error. | String                      |

Returning an error object will cause Okta to record a failure event in the Okta System Log. The string you supplied in the `errorSummary` property of the `error` object will be recorded in the System Log event.

## Sample Listing of JSON Payload of Request

```json
{
   "source":"cal7eyxOsnb20oWbZ0g4",
   "eventId":"JUGOUiYZTaKPmH6db0nDag",
   "eventTime":"2019-02-27T20:59:04.000Z",
   "data":{
      "context":{
         "conflicts":[
            "login"
         ],
         "application":{
            "name":"test_app",
            "id":"0oa7ey7aLRuBvcYUD0g4",
            "label":"app7ey6eU5coTOO5v0g4",
            "status":"ACTIVE"
         },
         "job":{
            "id":"ij17ez2AWtMZRfCZ60g4",
            "type":"import:users"
         },
         "matches":[
 
         ],
         "policy":[
            "EMAIL",
            "FIRST_AND_LAST_NAME"
         ]
      },
      "action":{
         "result":"CREATE_USER"
      },
      "appUser":{
         "profile":{
            "firstName":"Sally2",
            "lastName":"Admin2",
            "mobilePhone":null,
            "accountType":"PRO",
            "secondEmail":null,
            "failProvisioning":null,
            "failDeprovisioning":null,
            "externalId":"user221",
            "groups":[
               "everyone@clouditude.net",
               "tech@clouditude.net"
            ],
            "userName":"administrator2",
            "email":"sally.admin@clouditude.net"
         }
      },
      "user":{
         "profile":{
            "lastName":"Admin2",
            "zipCode":null,
            "city":null,
            "secondEmail":null,
            "postAddress":null,
            "login":"sally.admin@clouditude.net",
            "firstName":"Sally2",
            "primaryPhone":null,
            "mobilePhone":null,
            "streetAddress":null,
            "countryCode":null,
            "typeId":null,
            "state":null,
            "email":"sally.admin@clouditude.net"
         }
      }
   },
   "eventTypeVersion":"1.0",
   "cloudEventVersion":"0.1",
   "eventType":"com.okta.import.transform",
   "contentType":"application/json"
}
```

## Sample Listing of JSON Payload of Response

```json
{"commands":
[{
    "type": "com.okta.identity.patch",
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
    "type": "com.okta.access.patch",
    "value":


    [
        {
        "op": "add",
        "path": "/claims/external_guid",
        "value": "F0384685-F87D-474B-848D-2058AC5655A7"
        }
    ]
    }
]}
```
## Enabling an Import Inline Hook

To activate the inline hook, you first need to register your external service endpoint with Okta using the [Inline Hooks Management API](/docs/api/resources/inline-hooks).

You then need to associate the registered inline hook with an app by completing the following steps in Admin Console:

1. Go to the **Applications** menu and scroll down to **Applications**.

1. Select the app that you want the inline hook to work with.

1. Select the **Provisioning** tab.

1. From the Settings column on the left side of the screen, select **To Okta**.

1. In the **Inline Hooks** section, click the **User Creation** dropdown menu. Any inline hooks you have registered will be listed. Select the one to use.

1. Click **Save**.


