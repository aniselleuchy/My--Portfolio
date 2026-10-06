const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    });

    if (!response.ok) {
        const text = await response.text();
        let message = `Request failed with status ${response.status}`;

        try {
            const data = JSON.parse(text);
            message = data.detail || data.message || message;
        } catch {
            if (text) {
                message = text;
            }
        }

        throw new Error(message);
    }

    const text = await response.text();

    if (!text) {
        return null;
    }

    return JSON.parse(text);
}

export function getProjects() {
    return request("/projects");
}

export function createProject(token, data) {
    return request("/projects", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
}

export function updateProject(token, id, data) {
    return request(`/projects/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
}

export function deleteProject(token, id) {
    return request(`/projects/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getSkills() {
    return request("/skills");
}

export function createSkill(token, data) {
    return request("/skills", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
}

export function updateSkill(token, id, data) {
    return request(`/skills/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
}

export function deleteSkill(token, id) {
    return request(`/skills/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getExperience() {
    return request("/experience");
}

export function createExperience(token, data) {
    return request("/experience", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
}

export function updateExperience(token, id, data) {
    return request(`/experience/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
}

export function deleteExperience(token, id) {
    return request(`/experience/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function sendMessage(data) {
    return request("/messages", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export function getMessages(token) {
    return request("/messages", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getMessage(token, id) {
    return request(`/messages/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function updateMessageReadStatus(token, id, isRead) {
    return request(`/messages/${id}/read`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            is_read: isRead
        })
    });
}

export function deleteMessage(token, id) {
    return request(`/messages/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function login(email, password) {
    const body = new URLSearchParams();

    body.append("username", email);
    body.append("password", password);

    return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body
    }).then(async (response) => {
        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || "Invalid email or password");
        }

        return response.json();
    });
}

export function getCurrentUser(token) {
    return request("/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getAdminDashboard(token) {
    return request("/admin/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function sendAIMessage(message) {
    return request("/ai/chat", {
        method: "POST",
        body: JSON.stringify({
            message
        })
    });
}