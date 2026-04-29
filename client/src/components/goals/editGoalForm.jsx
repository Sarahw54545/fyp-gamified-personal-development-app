import { useState, useEffect } from "react"
import { apiFetch } from "@/services/apiClient"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pencil } from "lucide-react"

function EditGoalForm({ goal, onGoalUpdated }) {
    const [title, setTitle] = useState(goal.title)
    const [description, setDescription] = useState(goal.description || "")
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const originalTitle = goal.title
    const originalDescription = goal.description || ""

    // Needed to show latest values when dialog is triggered (so unused changes arent shown if dialog is opened again)
    useEffect(() => {
        if (open) {
            setTitle(goal.title)
            setDescription(goal.description || "")
        }
    }, [open, goal])

    const isUnchanged =
        title.trim() === originalTitle &&
        description.trim() === originalDescription

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const updatedGoal = await apiFetch(
                `/api/goals/${goal.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        title,
                        description
                    })
                }
            )

            onGoalUpdated(updatedGoal)

            setOpen(false)

        } catch (err) {
            console.error(err)
        }

        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button className="bg-slate-700 hover:bg-slate-600 text-white" size="icon">
                    <Pencil size={16} />
                </Button>
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Edit Goal</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Goal title"
                        required
                    />

                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={loading || isUnchanged}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>
    )
}

export default EditGoalForm