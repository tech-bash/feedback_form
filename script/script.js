// Collect and display chart data on home page (index.html)
document.addEventListener("DOMContentLoaded", function() {
    const feedbackForm = document.getElementById("feedbackForm");
    const ratingInput = document.getElementById("rating");
    const ratingDisplay = document.getElementById("ratingDisplay");
    
    // Update rating display dynamically
    ratingDisplay.textContent = ratingInput.value;

    ratingInput.addEventListener("input", function() {
        ratingDisplay.textContent = ratingInput.value;
    });

    // Chart.js setup for the feedback chart
    let feedbackChart;

    const ctx = document.getElementById("feedbackChart").getContext("2d");

    function updateChart() {
        const ratingsData = JSON.parse(localStorage.getItem("feedbackRatings") || "[]");

        const ratingsCount = [0, 0, 0, 0, 0]; // Ratings count from 1 to 5
        ratingsData.forEach(rating => {
            ratingsCount[rating - 1]++;
        });

        if (feedbackChart) {
            feedbackChart.destroy();
        }

        feedbackChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["1", "2", "3", "4", "5"],
                datasets: [{
                    label: "Feedback Ratings",
                    data: ratingsCount,
                    backgroundColor: "#4CAF50",
                    borderColor: "#388E3C",
                    borderWidth: 1
                }]
            }
        });
    }

    // Initialize chart with existing data (if any)
    updateChart();

    // Handle form submission
    feedbackForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent form reload

        const rating = ratingInput.value;
        const comments = document.getElementById("comments").value;
        const reason = document.getElementById("reason").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        // Store feedback data in localStorage (or send it to a server)
        let feedbackRatings = JSON.parse(localStorage.getItem("feedbackRatings") || "[]");
        feedbackRatings.push(parseInt(rating));
        localStorage.setItem("feedbackRatings", JSON.stringify(feedbackRatings));

        // Redirect to Thank You page
        window.location.href = 'thankyou.html';
    });
});
