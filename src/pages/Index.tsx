import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { HeartCrack } from "lucide-react";

// SEO-friendly single H1 and semantic structure
const Index = () => {
  const [duration, setDuration] = useState<number>(36);
  const [money, setMoney] = useState<number>(0);
  const [gifts, setGifts] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const calculate = () => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const reasonMultiplier: Record<string, number> = {
      mutual: 0.85,
      cheated: 1.6,
      communication: 1.1,
      longdistance: 1.0,
      familypressure: 0.9,
      justbecause: 1.2,
    };

    const statusMultiplier: Record<string, number> = {
      blocked: 1.25,
      unblocked: 1.0,
      complicated: 1.12,
    };

    const base = money * rand(0.15, 0.45) + duration * rand(80, 170) + gifts * rand(0.4, 1.2);
    const multiplier = (reasonMultiplier[reason] ?? 1) * (statusMultiplier[status] ?? 1);
    const spice = rand(0.9, 1.2);
    const total = Math.max(0, Math.round(base * multiplier * spice));

    setResult(total);

    const msg = total > 50000
      ? "Yikes! That’s a premium heartbreak. Maybe negotiate in installments?"
      : total > 15000
      ? "Manageable damage. A nice dinner (or two) might settle it."
      : "Keep it classy — maybe just return the hoodie and move on.";
    setMessage(msg);

    toast({ title: "Calculated ❤️‍🩹", description: `Suggested settlement: ${formatINR(total)}` });
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-4 py-10">
      <main className="w-full max-w-2xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Breakup Settlement Calculator
          </h1>
          <p className="mt-2 text-muted-foreground max-w-prose mx-auto">
            A playful tool to estimate a fun “settlement” — don’t take it too seriously!
          </p>
        </header>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartCrack className="opacity-80" /> Enter breakup details
            </CardTitle>
            <CardDescription>
              We never store any data. Results are randomly flavored for fun.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="duration">Relationship Duration (months)</Label>
                <Input id="duration" type="number" min={0} value={duration} onChange={(e) => setDuration(Number(e.target.value || 0))} placeholder="e.g., 36" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="money">Money Spent So Far (₹)</Label>
                <Input id="money" type="number" min={0} value={money} onChange={(e) => setMoney(Number(e.target.value || 0))} placeholder="e.g., 25000" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gifts">Gifts Value (₹)</Label>
                <Input id="gifts" type="number" min={0} value={gifts} onChange={(e) => setGifts(Number(e.target.value || 0))} placeholder="e.g., 5000" />
              </div>

              <div className="grid gap-2">
                <Label>Breakup Reason</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mutual">Mutual Decision</SelectItem>
                    <SelectItem value="cheated">Cheated</SelectItem>
                    <SelectItem value="communication">Communication Issues</SelectItem>
                    <SelectItem value="longdistance">Long Distance</SelectItem>
                    <SelectItem value="familypressure">Family Pressure</SelectItem>
                    <SelectItem value="justbecause">Just Because</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Block/Unblock Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="unblocked">Unblocked</SelectItem>
                    <SelectItem value="complicated">It’s Complicated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Button variant="hero" className="w-full" onClick={calculate}>
                  Calculate ❤️
                </Button>
              </div>

              {result !== null && (
                <div className="rounded-md border p-4">
                  <p className="text-sm text-muted-foreground">Suggested settlement</p>
                  <p className="mt-1 text-2xl font-semibold">{formatINR(result)}</p>
                  <p className="mt-2 text-sm">{message}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-xs text-muted-foreground">
          For entertainment only. Be kind, heal well. ✨
        </footer>
      </main>
    </div>
  );
};

export default Index;
