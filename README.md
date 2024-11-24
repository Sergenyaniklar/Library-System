
	<h1>Library Management System</h1>

    <h2>Proje Açıklaması</h2>
    <p>
        Library Management System, bir kütüphanenin kitap, borçlanma ve yayınevi gibi verilerini yönetmek için geliştirilmiş bir web uygulamasıdır. 
        Bu uygulama, React (frontend) ve Spring Boot (backend) kullanılarak geliştirilmiştir. Kullanıcılar kitapları listeleyebilir, borçlanma işlemleri 
        yapabilir ve yayınevi bilgilerini yönetebilir.
    </p>

    <h2>Kullanılan Teknolojiler</h2>
    <ul>
        <li><strong>Frontend:</strong> React.js, Axios, CSS</li>
        <li><strong>Backend:</strong> Spring Boot</li>
        <li><strong>Database:</strong> H2/PostgreSQL</li>
        <li><strong>API İletişimi:</strong> RESTful API</li>
    </ul>

    <h2>Klasör Yapısı</h2>
    <pre>
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Books.jsx
│   │   ├── Borrow.jsx
│   │   ├── Publishers.jsx
│   ├── App.js
│   ├── index.js
├── package.json
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com.example.library/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── model/
│   │   │       ├── repository/
│   ├── resources/
│       ├── application.properties
├── pom.xml
    </pre>
