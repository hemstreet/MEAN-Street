To view available models
`/api/v1/models`
```
{
    success: true,
    models: [
       "Drink",
        "User"
    ]
}
```

To view a model's entries ( view the collection)
`/api/v1/list/:modelName` i.e `/api/v1/list/User`

```
{
    success: true,
    entries: [
        {
            password: "sha1$11111$111111$111111$111111$11111",
            admin: true,
            username: "admin",
            _id: "123456789",
            __v: 0
        },
        {
            __v: 0,
            _id: "987654321",
            password: "sha1$22222$222222$222222$222222$22222",
            username: "notSoAdmin"
        }
    ]
}
```

To view a model's schema
`api/v1/schema/User`
```
{
    success: true,
    schema: {
        username: {
            type: "String",
            unique: true,
            placeholder: "Username",
            fieldType: "text"
        },
        password: {
            type: "String",
            fieldType: "password",
            placeholder: "Password",
            hidden: true
        },
        _admin: {
            type: "Boolean"
        }
    }
}
```

To View a model's fields ( does not show custom underscore prefixed fields )
`/api/v1/fields/User`
```
{
    success: true,
    fields: [
        "_id",
        "username",
        "password"
    ]
}
```