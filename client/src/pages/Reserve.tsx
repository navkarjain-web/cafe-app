import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Clock, Users } from "lucide-react";
import { toast } from "sonner";

const reservationSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Phone must be at least 10 characters"),
  partySize: z.number().min(1).max(20),
  reservationDate: z.string().min(1, "Date is required"),
  reservationTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  specialRequests: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

export default function Reserve() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      partySize: 2,
    },
  });

  const createReservation = trpc.reservations.create.useMutation();

  const onSubmit = async (data: ReservationFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await createReservation.mutateAsync({
        customerName: data.customerName.trim(),
        customerEmail: data.customerEmail.trim(),
        customerPhone: data.customerPhone.trim(),
        partySize: Number(data.partySize),
        reservationDate: new Date(data.reservationDate),
        reservationTime: data.reservationTime,
        specialRequests: data.specialRequests?.trim() || "",
      });

      if (response) {
        toast.success("Reservation Completed Successfully ✅");

        reset({
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          partySize: 2,
          reservationDate: "",
          reservationTime: "",
          specialRequests: "",
        });
      }

    } catch (error) {
      console.log(error);
      toast.error("Reservation Failed ");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary/10 border-b-2 border-foreground py-6">
        <div className="container">
          <Link to="/">
            <span className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors cursor-pointer mb-4">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </span>
          </Link>

          <h1 className="text-5xl font-bold text-foreground">
            Reserve a Table
          </h1>

          <p className="text-lg text-muted-foreground mt-2">
            Book your perfect moment at UÉLOCE
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="container max-w-2xl">
          <div className="bg-card border-2 border-foreground rounded-lg p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Your Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Name *
                    </label>

                    <Input
                      {...register("customerName")}
                      placeholder="Your full name"
                    />

                    {errors.customerName && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email *
                      </label>

                      <Input
                        {...register("customerEmail")}
                        type="email"
                        placeholder="your@email.com"
                      />

                      {errors.customerEmail && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.customerEmail.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone *
                      </label>

                      <Input
                        {...register("customerPhone")}
                        type="tel"
                        placeholder="+91 9876543210"
                      />

                      {errors.customerPhone && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.customerPhone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reservation Details */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Reservation Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date *
                    </label>

                    <Input
                      {...register("reservationDate")}
                      type="date"
                    />

                    {errors.reservationDate && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.reservationDate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time *
                    </label>

                    <Input
                      {...register("reservationTime")}
                      type="time"
                    />

                    {errors.reservationTime && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.reservationTime.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Party Size *
                    </label>

                    <select
                      {...register("partySize", {
                        valueAsNumber: true,
                      })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((size) => (
                        <option key={size} value={size}>
                          {size} {size === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>

                    {errors.partySize && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.partySize.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Special Requests
                </label>

                <Textarea
                  {...register("specialRequests")}
                  rows={4}
                  placeholder="Any dietary restrictions, celebrations, or special requests?"
                />
              </div>

              {/* Policy */}
              <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
                <p className="text-sm text-muted-foreground">
                  By submitting this form, you agree to our reservation policy.
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-lg py-6"
              >
                {isSubmitting ? "Booking..." : "Complete Reservation"}
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="mt-8 bg-secondary/10 border-2 border-secondary p-6 rounded-lg">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Reservation Policy
            </h3>

            <ul className="space-y-2 text-muted-foreground">
              <li>• Reservations are held for 15 minutes.</li>
              <li>• Please call us to cancel or modify.</li>
              <li>• Groups of 8+ may require deposit.</li>
              <li>• Walk-ins subject to availability.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}