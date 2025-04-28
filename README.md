# 📦 paveld-rads Kubernetes Deployment

Deploy a secured Node.js app behind Traefik Ingress with Basic Authentication using Helm.

---

## 🚀 Quick Start

### 1. Requirements

- Kubernetes cluster (K3s or standard Kubernetes)
- Traefik v2 Ingress Controller installed
- Traefik CRDs installed:
  ```bash
  kubectl apply -f https://raw.githubusercontent.com/traefik/traefik/v2.10/docs/content/reference/dynamic-configuration/kubernetes-crd-definition-v1.yml
  ```
- Helm installed (`v3` or higher)
- `openssl` and `htpasswd` available locally (`brew install httpd` on Mac)

---

### 2. Deploy the application

Run:

```bash
./runme.sh
```

✅ This script will:
- Prompt for username and password
- Generate secure htpasswd entry
- Create Kubernetes Secret and Middleware
- Deploy the app, Service, and Ingress using Helm

---

### 3. Access the app

Open your browser:

```text
https://paveld-rads.druyan.net
```

> ℹ️ **Note:** You can change the domain `paveld-rads.druyan.net` by modifying the `ingress.hostname` value in `values.yaml`.

✅ You will be prompted for Basic Authentication.

---

## 🛠 Customization

Edit `values.yaml` to change:

| Field | Purpose |
|-------|---------|
| `ingress.hostname` | Set your custom domain |
| `service.port` | Adjust exposed application port |
| `basicAuth.users` | (auto-filled during runme.sh) |

---

## 📜 Folder Structure

```text
helm/
  templates/
    basic-auth-secret.yaml
    basic-auth-middleware.yaml
    service.yaml
    ingress.yaml
  values.yaml
runme.sh
README.md
```

---

## 🛡 Security Notes

- Passwords are **bcrypt hashed** using `htpasswd`.
- Stored securely inside Kubernetes Secrets.
- Basic Authentication is enforced via Traefik Middleware.

---

