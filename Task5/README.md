## Анализ Swagger контракта

**Ключевые операции:**

1. `GET /clients/{id}` - Информация о клиенте
2. `GET /clients/{id}/documents` - Список документов клиента
3. `GET /clients/{id}/relatives` - Список родственников клиента

**Проблемы текущего контракта:**

1. N+1 проблема при получении связанных данных
2. Over-fetching - клиенты получают лишние данные
3. Under-fetching - требуется несколько запросов для полной информации
4. Жесткая структура ответов

## GraphQL схема

```graphql
type Client {
  id: ID!
  name: String
  age: Int
  email: String
  phone: String
  address: Address
  employment: EmploymentInfo
  documents: [Document]
  relatives: [Relative]
}

type Address {
  street: String
  city: String
  postalCode: String
  country: String
}

type EmploymentInfo {
  company: String
  position: String
}

type Document {
  id: ID!
  type: DocumentType!
  number: String!
  issueDate: String
  expiryDate: String
  scanUrl: String
  status: DocumentStatus
}

type Relative {
  id: ID!
  relationType: RelationType!
  name: String!
  age: Int
  email: String
  phone: String
  address: Address
  documents: [Document]
}

enum DocumentType {
  PASSPORT
  DRIVER_LICENSE
  INSURANCE_CARD
  MEDICAL_POLICY
  BIRTH_CERTIFICATE
}

enum RelationType {
  SPOUSE
  CHILD
  PARENT
  SIBLING
}

enum DocumentStatus {
  ACTIVE
  EXPIRED
  PENDING_VERIFICATION
}

type Query {
  client(id: ID!): Client

  clientDocuments(id: ID!): [Document]

  clientRelatives(id: ID!): [Relative]
}
```

Реализован обощенный запрос client для возможности получения клиента с необходимыми полями, документами и родственниками.
Оставлены запросы документов и родственников для более специфичных сценариев.
