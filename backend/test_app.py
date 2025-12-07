from app import app

def test_get_contacts():
    client = app.test_client()
    response = client.get("/contacts")
    assert response.status_code == 200

def test_add_contact():
    client = app.test_client()
    response = client.post("/contacts", json={
        "name": "Alice",
        "email": "alice@example.com",
        "phone": "123456789"
    })
    assert response.status_code == 201
