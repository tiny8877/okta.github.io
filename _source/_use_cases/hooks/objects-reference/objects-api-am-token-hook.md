
# API Access Management Inline Hook

The following is a description of the objects specific to one of the types of inline hooks supported by Okta, the API Access Management hook. Included are the objects contained in the JSON payload of the outbound request from Okta to your external service, as well as the objects that your external service can return to Okta in its response.

For a general introduction Okta inline hooks, see [Inline Hooks](/use_cases/hooks/).

For information the API for registering an external service endpoint, see [Callbacks API](/api/resources/callbacks).

## Objects in the Request from Okta

### data.tokens.access_token

This object provides your external service with information on the access token that Okta has generated.

| Property | Description                               | Data Type                    |
|----------|-------------------------------------------|------------------------------|
| claims   | Claims included in the token.             | [claims](#claims) object     |
| lifetime | Lifetime of the token                     | [lifetime](#lifetime) object |
| scopes   | The scopes contained in the access token. | [scopes](#scopes) object     |

#### claims

| Property   | Description | Data Type |
|------------|-------------|-----------|
| ver        |             |           |
| jti        |             |           |
| iss        |             |           |
| aud        |             |           |
| cid        |             |           |
| uid        |             |           |
| sub        |             |           |
| patientId  |             |           |
| appProfile |             |           |
| claim1     |             |           |

#### lifetime

| Property | Description | Data Type |
| ---      | ---         | ---       |
| expiration |           | Number |

#### scopes

| Property | Description | Data Type |
| ---      | ---         | ---       |
|




data.tokens.id_token
    claims
    lifetime


## Objects in Your Response to Okta

### commands





data.context.request
data.context.protocol
data.context.session
data.context.user
data.context.policy





{
	"eventTypeVersion": "1.0",
	"cloudEventVersion": "0.1",
	"eventType": "com.okta.tokens.transform",
	"contentType": "application/json",
	"source": "https://gronberg.oktapreview.com/oauth2/ausar8buzjFYEyAf00h7/v1/authorize",
	"eventId": "ue59hs25STaP4r0EVDK30A",
	"eventTime": "2018-11-07T04:32:50.000Z",
	"data": {
		"context": {
			"request": {
				"id": "W@Jq8nDC85a0QjAcA7zG8gAABU0",
				"method": "GET",
				"url": {
					"value": "https://gronberg.oktapreview.com/oauth2/ausar8buzjFYEyAf00h7/v1/authorize?scope=openid+profile+email+address+phone+providers%3Aread&response_type=id_token+token&redirect_uri=http%3A%2F%2Flocalhost%3A8080&state=myState&nonce=fc2422c5-dd72-469d-af25-23ad33052ec6&client_id=ULx7dd5LbNbXSs1HQOFn&response_mode=fragment"
				},
				"ipAddress": "24.4.98.131"
			},
			"protocol": {
				"type": "OAUTH2.0",
				"request": {
					"scope": "openid profile email address phone providers:read",
					"state": "myState",
					"redirect_uri": "http://localhost:8080",
					"response_mode": "fragment",
					"response_type": "id_token token",
					"client_id": "ULx7dd5LbNbXSs1HQOFn"
				},
				"issuer": {
					"uri": "https://gronberg.oktapreview.com/oauth2/ausar8buzjFYEyAf00h7"
				},
				"client": {
					"id": "ULx7dd5LbNbXSs1HQOFn",
					"name": "AcmeHealth",
					"type": "PUBLIC"
				}
			},
			"session": {
				"id": "1027TQm2pqHTyCeVhJmKHZnkw",
				"userId": "00u8740btccGyzDWx0h7",
				"login": "john.gronberg@okta.com",
				"createdAt": "2018-10-26T00:45:18.000Z",
				"expiresAt": "2019-02-05T04:32:50.000Z",
				"status": "ACTIVE",
				"lastPasswordVerification": "2018-10-26T00:45:18.000Z",
				"lastFactorVerification": "2018-11-02T23:27:08.000Z",
				"amr": ["MULTIFACTOR_AUTHENTICATION", "POP_SOFTWARE_KEY", "PASSWORD"],
				"idp": {
					"id": "00o8740bsphMpKDXb0h7",
					"type": "OKTA"
				},
				"mfaActive": false
			},
			"user": {
				"id": "00u8740btccGyzDWx0h7",
				"passwordChanged": "2016-11-04T21:45:01.000Z",
				"profile": {
					"login": "john.gronberg@okta.com",
					"firstName": "John",
					"lastName": "Gronberg",
					"locale": "en",
					"timeZone": "America/Los_Angeles"
				},
				"_links": {
					"groups": {
						"href": "https://gronberg.oktapreview.com/00u8740btccGyzDWx0h7/groups"
					},
					"factors": {
						"href": "https://gronberg.oktapreview.com/api/v1/users/00u8740btccGyzDWx0h7/factors"
					}
				}
			},
			"policy": {
				"id": "00par8cw5hoBA4cbS0h7",
				"rule": {
					"id": "0prar8bv1vRYcx0BM0h7"
				}
			}
		},
		"tokens": {
			"access_token": {
				"claims": {
					"ver": 1,
					"jti": "AT.VqGGGOzfXBO9W8sQX9VVesoEZPNcfaA40O03kL3bmeY",
					"iss": "https://gronberg.oktapreview.com/oauth2/ausar8buzjFYEyAf00h7",
					"aud": "http://api.acmehealth.com",
					"cid": "ULx7dd5LbNbXSs1HQOFn",
					"uid": "00u8740btccGyzDWx0h7",
					"sub": "john.gronberg@okta.com",
					"patientId": "00u8740btccGyzDWx0h7",
					"appProfile": [null],
					"claim1": "123"
				},
				"lifetime": {
					"expiration": 3600
				},
				"scopes": {
					"providers:read": {
						"id": "scpar8df93cuLZCxF0h7",
						"action": "GRANT"
					},
					"address": {
						"id": "scp84nOCzqB0J8XnANCm",
						"action": "GRANT"
					},
					"phone": {
						"id": "scpNswJCADebMsTYA8QK",
						"action": "GRANT"
					},
					"openid": {
						"id": "scpfdR6WGIhVJRdYu3Nn",
						"action": "GRANT"
					},
					"profile": {
						"id": "scpbqkNe8xw5Kn2TggXf",
						"action": "GRANT"
					},
					"email": {
						"id": "scpaCFpTtlAKTMa28vPW",
						"action": "GRANT"
					}
				}
			},
			"id_token": {
				"claims": {
					"sub": "00u8740btccGyzDWx0h7",
					"name": "Gronberg",
					"email": "john.gronberg@okta.com",
					"ver": 1,
					"iss": "https://gronberg.oktapreview.com/oauth2/ausar8buzjFYEyAf00h7",
					"aud": "ULx7dd5LbNbXSs1HQOFn",
					"jti": "ID.ScFFhqwI6YT0pi8ryr00F0HR84Tom284TlismVBpBjM",
					"amr": ["mfa", "swk", "pwd"],
					"idp": "00o8740bsphMpKDXb0h7",
					"nonce": "fc2422c5-dd72-469d-af25-23ad33052ec6",
					"preferred_username": "john.gronberg@okta.com",
					"auth_time": 1540514718
				},
				"lifetime": {
					"expiration": 3600
				}
			}
		}
	}
}





