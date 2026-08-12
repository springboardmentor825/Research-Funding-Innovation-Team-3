# UI Workflow / Wireframe Notes

## Landing
```text
[Research Intelligence]

Research Funding & Innovation Intelligence Platform
Milestone 1 foundation
[Create account] [Sign in]
```

## Authenticated shell
```text
Header: Brand | Profile | Publications | Patents | Admin* | Logout

Main content
```
`Admin*` is rendered only for the Administrator role.

## Dashboard
```text
Welcome, <name>
Role: <role>

[Research Profile] [Publications] [Patents]
```

## Research Profile
```text
Academic information + Organization
[form fields] [Save]

[Research Domains] [Research Interests]
[Keywords]         [Technology Areas]

Research History
[title/description/start/end] [Add]
[history rows] [Delete]

Saved publications count | Saved patents count
```

## External datasets
```text
Publications
[query] [Search]
[result cards] [Save to profile]

Patents
[query] [Search]
[result cards] [Save to profile]
```

Loading, error, empty and success states are represented by the frontend components/API client.
