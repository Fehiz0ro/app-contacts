from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

contacts = []
next_id = 1

@app.route("/contacts", methods=["GET"])
def get_contacts():
    return jsonify(contacts)

@app.route("/contacts", methods=["POST"])
def add_contact():
    global next_id

    # Forcer la lecture du JSON même si l'en-tête Content-Type pose problème
    data = request.get_json(force=True)
    print("DATA RECEIVED:", data)  # debug pour vérifier le contenu

    new_contact = {
        "id": next_id,
        "name": data.get("name"),
        "email": data.get("email"),
        "phone": data.get("phone")  # maintenant devrait fonctionner
    }

    contacts.append(new_contact)
    next_id += 1

    return jsonify(new_contact), 201

@app.route("/contacts/<int:contact_id>", methods=["DELETE"])
def delete_contact(contact_id):
    global contacts
    contacts = [c for c in contacts if c["id"] != contact_id]
    return jsonify({"message": "Deleted"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

