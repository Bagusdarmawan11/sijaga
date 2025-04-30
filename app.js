document.addEventListener("DOMContentLoaded", function () {
    const shareProfileBtn = document.querySelector(".share-button");
    const shareButtons = document.querySelectorAll(".tile-share-button");

    // Share Profile
    shareProfileBtn.addEventListener("click", async () => {
        const profileLink = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Bagus Access Center",
                    text: "Cek profil ini!",
                    url: profileLink,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            await navigator.clipboard.writeText(profileLink);
            alert("Profile link copied: " + profileLink);
        }
    });

    // Share Individual Links
    shareButtons.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const link = btn.getAttribute("data-link");

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "Bagikan Link",
                        url: link,
                    });
                } catch (err) {
                    console.error("Error sharing:", err);
                }
            } else {
                await navigator.clipboard.writeText(link);
                alert("Link copied: " + link);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const customizeBtn = document.getElementById("customize-btn");
    const modal = document.getElementById("custom-modal");
    const closeModal = document.getElementById("close-modal");
    const applyBgBtn = document.getElementById("apply-bg");
    const resetBgBtn = document.getElementById("reset-bg"); // Tombol Reset
    const bgColorInput = document.getElementById("bg-color");
    const bgImageInput = document.getElementById("bg-image");

    // Load saved background settings
    const savedBgColor = localStorage.getItem("bgColor");
    const savedBgImage = localStorage.getItem("bgImage");

    if (savedBgColor) {
        document.body.style.backgroundColor = savedBgColor;
    }

    if (savedBgImage) {
        document.body.style.backgroundImage = `url(${savedBgImage})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }

    // Show modal
    customizeBtn.addEventListener("click", () => {
        modal.classList.add("show");
    });

    // Hide modal
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    // Apply background settings
    applyBgBtn.addEventListener("click", () => {
        const selectedColor = bgColorInput.value;
        const selectedImage = bgImageInput.files[0];

        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.body.style.backgroundImage = `url(${e.target.result})`;
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
                localStorage.setItem("bgImage", e.target.result);
                localStorage.removeItem("bgColor"); // Hapus warna jika gambar diterapkan
            };
            reader.readAsDataURL(selectedImage);
        } else if (selectedColor) {
            document.body.style.backgroundColor = selectedColor;
            document.body.style.backgroundImage = "none"; // Hapus gambar jika warna diterapkan
            localStorage.setItem("bgColor", selectedColor);
            localStorage.removeItem("bgImage"); // Hapus gambar dari localStorage
        }

        modal.classList.remove("show");
    });

    // Reset background to default
    resetBgBtn.addEventListener("click", () => {
        document.body.style.backgroundColor = "";
        document.body.style.backgroundImage = "none";
        localStorage.removeItem("bgColor");
        localStorage.removeItem("bgImage");
        modal.classList.remove("show");
    });
});

