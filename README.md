# Inge Bra Bygg

## Setup
- .env behöver en PORT & en JWT_SECRET
- Seed innehåller en admin, som i sin tur kan skapa nya användare.

| Username  | password |
| ------------- | ------------- |
| Tuffaste Admin  | makrill  |

## Tekniker
- Node
- Express
- SQLite
- JWT
- Bcrypt
- JSON
- Projektstruktur enligt MVC
- RBAC
- Filuppladdning

## Endpoints
Notera att vissa endpoints förekommer flera gånger under olika roller.

### Generella Endpoints
| Method | Path | Kommentar |
| ------------- | ------------- | ------------- |
| POST | /authenticate | Loggar in användaren genom att skicka tillbaka en JWT |
| GET | /me | Ger tillbaka användarinfo för den inloggade användaren |
| PATCH | /me | Ändrar användarens profil |
| GET | /users | Ej tillgänglig för clients. Listar användare. Query params: role: all/admin/worker/client, search: Searches the names of users |
| GET | /users/:id | Hämtar en användare |

### Admin Endpoints
| Method | Path | Kommentar |
| ------------- | ------------- | ------------- |
| POST | /users | Skapar en ny användare |
| PATCH | /users/:id | Uppdaterar användaren |
| DELETE | /users/:id | Tar bort en användare |
| DELETE | /tasks/:id | Raderar ett ärende |

### Worker Endpoints
| Method | Path | Kommentar |
| ------------- | ------------- | ------------- |
| POST | /tasks | Skapar ett nytt ärende |
| GET | /tasks | Hämtar arbetarens ärenden. Query params: filter: all/done, search: Searches tasks using the clients’ name |
| GET | /tasks/:id | Hämtar ett ärende |
| PATCH | /tasks/:id | Uppdaterar ett ärende |
| DELETE | /tasks/:id | Tar bort ett ärende |
| GET | /tasks/:id/messages | Hämtar alla meddelanden kopplade till ärendet, paginerat och sorterat efter tid. |
| POST | /tasks/:id/messages | Skapar ett nytt meddelande på ärendet |
| DELETE | /tasks/:id/messages | Raderar ett meddelande |
| POST | /tasks/:id/image | Laddar upp en bild på ärendet |

### Client Endpoints
| Method | Path | Kommentar |
| ------------- | ------------- | ------------- |
| GET | /tasks | Hämtar kundens ärenden |
| GET | /tasks/:id | Hämtar ett ärende. Ska bara kunna se sina egna |
| GET | /tasks/:id/messages | Hämtar meddelanden kopplade till ärenden |
| POST | /tasks/:id/messages | Skapar ett nytt meddelande på ärendet |
| DELETE | /tasks/:id/messages | Raderar ett meddelande |
