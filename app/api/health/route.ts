export const GET = async () => {
    try {
        return Response.json({ message: "OK" }, { status: 200 });
    } catch (error) {
        console.error("Get health error:", error);
        return Response.json({ error: "Failed to get health" }, { status: 500 });
    }
}