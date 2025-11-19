import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Project, Service, Prompt, FunFact, PersonalStat } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Lock, LogOut, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// --- Generic Components ---

const DeleteButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="destructive" size="icon" onClick={onClick}>
    <Trash2 className="h-4 w-4" />
  </Button>
);

const EditButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="outline" size="icon" onClick={onClick}>
    <Pencil className="h-4 w-4" />
  </Button>
);

// --- Managers ---

const ProjectManager = () => {
  const queryClient = useQueryClient();
  const { data: projects = [] } = useQuery<Project[]>({ queryKey: ['/api/projects'] });
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ title: "", subtitle: "", description: "", link: "", order: 0 });

  const createMutation = useMutation({
    mutationFn: async (data: any) => await apiRequest("POST", "/api/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setIsDialogOpen(false);
      toast({ title: "Project created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error creating project", description: error.message, variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => await apiRequest("PUT", `/api/projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setIsDialogOpen(false);
      toast({ title: "Project updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating project", description: error.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await apiRequest("DELETE", `/api/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({ title: "Project deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting project", description: error.message, variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, order: Number(formData.order) };
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormData({ title: "", subtitle: "", description: "", link: "", order: projects.length + 1 });
    setIsDialogOpen(true);
  };

  const openEdit = (item: Project) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title, 
      subtitle: item.subtitle, 
      description: item.description, 
      link: item.link, 
      order: item.order 
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Projects</h3>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
      </div>

      <div className="grid gap-4">
        {projects.map(project => (
          <Card key={project.id}>
            <CardContent className="p-4 flex justify-between items-start">
              <div>
                <div className="font-bold">{project.title} <span className="text-muted-foreground font-normal text-sm">({project.subtitle})</span></div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <EditButton onClick={() => openEdit(project)} />
                <DeleteButton onClick={() => deleteMutation.mutate(project.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Project" : "New Project"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <Input placeholder="Subtitle" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} required />
            <Textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
            <Input placeholder="Link URL" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} required />
            <Input type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} required />
            <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ServiceManager = () => {
  const queryClient = useQueryClient();
  const { data: services = [] } = useQuery<Service[]>({ queryKey: ['/api/services'] });
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", order: 0 });

  const createMutation = useMutation({
    mutationFn: async (data: any) => await apiRequest("POST", "/api/services", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      setIsDialogOpen(false);
      toast({ title: "Service created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error creating service", description: error.message, variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => await apiRequest("PUT", `/api/services/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      setIsDialogOpen(false);
      toast({ title: "Service updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating service", description: error.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await apiRequest("DELETE", `/api/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      toast({ title: "Service deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting service", description: error.message, variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, order: Number(formData.order) };
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormData({ title: "", description: "", order: services.length + 1 });
    setIsDialogOpen(true);
  };

  const openEdit = (item: Service) => {
    setEditingItem(item);
    setFormData({ title: item.title, description: item.description, order: item.order });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Services</h3>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
      </div>

      <div className="grid gap-4">
        {services.map(service => (
          <Card key={service.id}>
            <CardContent className="p-4 flex justify-between items-start">
              <div>
                <div className="font-bold">{service.title}</div>
                <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <EditButton onClick={() => openEdit(service)} />
                <DeleteButton onClick={() => deleteMutation.mutate(service.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Service" : "New Service"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <Textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
            <Input type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} required />
            <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const PromptManager = () => {
  const queryClient = useQueryClient();
  const { data: prompts = [] } = useQuery<Prompt[]>({ queryKey: ['/api/prompts'] });
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Prompt | null>(null);
  const [formData, setFormData] = useState({ title: "", subtitle: "", content: "", order: 0 });

  const createMutation = useMutation({
    mutationFn: async (data: any) => await apiRequest("POST", "/api/prompts", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/prompts'] });
      setIsDialogOpen(false);
      toast({ title: "Prompt created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error creating prompt", description: error.message, variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => await apiRequest("PUT", `/api/prompts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/prompts'] });
      setIsDialogOpen(false);
      toast({ title: "Prompt updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating prompt", description: error.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await apiRequest("DELETE", `/api/prompts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/prompts'] });
      toast({ title: "Prompt deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting prompt", description: error.message, variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, order: Number(formData.order) };
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormData({ title: "", subtitle: "", content: "", order: prompts.length + 1 });
    setIsDialogOpen(true);
  };

  const openEdit = (item: Prompt) => {
    setEditingItem(item);
    setFormData({ title: item.title, subtitle: item.subtitle, content: item.content, order: item.order });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Prompts</h3>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" /> Add Prompt</Button>
      </div>

      <div className="grid gap-4">
        {prompts.map(prompt => (
          <Card key={prompt.id}>
            <CardContent className="p-4 flex justify-between items-start">
              <div>
                <div className="font-bold">{prompt.title} <span className="text-muted-foreground font-normal text-sm">({prompt.subtitle})</span></div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2 font-mono">{prompt.content}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <EditButton onClick={() => openEdit(prompt)} />
                <DeleteButton onClick={() => deleteMutation.mutate(prompt.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Prompt" : "New Prompt"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <Input placeholder="Subtitle (Category)" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} required />
            <Textarea placeholder="Content" className="min-h-[150px] font-mono text-xs" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required />
            <Input type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} required />
            <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const FactManager = () => {
  const queryClient = useQueryClient();
  const { data: facts = [] } = useQuery<FunFact[]>({ queryKey: ['/api/fun-facts'] });
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FunFact | null>(null);
  const [formData, setFormData] = useState({ category: "games", content: "", order: 0 });

  const createMutation = useMutation({
    mutationFn: async (data: any) => await apiRequest("POST", "/api/fun-facts", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/fun-facts'] });
      setIsDialogOpen(false);
      toast({ title: "Fact created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error creating fact", description: error.message, variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => await apiRequest("PUT", `/api/fun-facts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/fun-facts'] });
      setIsDialogOpen(false);
      toast({ title: "Fact updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating fact", description: error.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await apiRequest("DELETE", `/api/fun-facts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/fun-facts'] });
      toast({ title: "Fact deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting fact", description: error.message, variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, order: Number(formData.order) };
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormData({ category: "games", content: "", order: facts.length + 1 });
    setIsDialogOpen(true);
  };

  const openEdit = (item: FunFact) => {
    setEditingItem(item);
    setFormData({ category: item.category, content: item.content, order: item.order });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Fun Facts</h3>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" /> Add Fact</Button>
      </div>

      <div className="grid gap-4 max-h-[600px] overflow-y-auto">
        {facts.map(fact => (
          <Card key={fact.id}>
            <CardContent className="p-3 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase bg-muted px-2 py-1 rounded mr-2">{fact.category}</span>
                <span className="text-sm">{fact.content}</span>
              </div>
              <div className="flex gap-2 ml-4">
                <EditButton onClick={() => openEdit(fact)} />
                <DeleteButton onClick={() => deleteMutation.mutate(fact.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Fact" : "New Fact"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select 
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="games">Games</option>
                <option value="films">Films</option>
                <option value="tv">TV</option>
                <option value="artists">Artists</option>
                <option value="hobbies">Hobbies</option>
                <option value="episodes">Episodes</option>
              </select>
            </div>
            <Input placeholder="Content" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required />
            <Input type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} required />
            <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const StatManager = () => {
  const queryClient = useQueryClient();
  const { data: stats = [] } = useQuery<PersonalStat[]>({ queryKey: ['/api/personal-stats'] });
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PersonalStat | null>(null);
  const [formData, setFormData] = useState({ category: "big5", label: "", valueNum: "", valueText: "", order: 0 });

  const createMutation = useMutation({
    mutationFn: async (data: any) => await apiRequest("POST", "/api/personal-stats", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personal-stats'] });
      setIsDialogOpen(false);
      toast({ title: "Stat created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error creating stat", description: error.message, variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => await apiRequest("PUT", `/api/personal-stats/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personal-stats'] });
      setIsDialogOpen(false);
      toast({ title: "Stat updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating stat", description: error.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await apiRequest("DELETE", `/api/personal-stats/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personal-stats'] });
      toast({ title: "Stat deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting stat", description: error.message, variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { 
      ...formData, 
      order: Number(formData.order),
      valueNum: formData.valueNum ? Number(formData.valueNum) : null,
      valueText: formData.valueText || null
    };
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormData({ category: "big5", label: "", valueNum: "", valueText: "", order: stats.length + 1 });
    setIsDialogOpen(true);
  };

  const openEdit = (item: PersonalStat) => {
    setEditingItem(item);
    setFormData({ 
      category: item.category, 
      label: item.label, 
      valueNum: item.valueNum?.toString() || "", 
      valueText: item.valueText || "", 
      order: item.order 
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Personal Stats</h3>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" /> Add Stat</Button>
      </div>

      <div className="grid gap-4">
        {stats.map(stat => (
          <Card key={stat.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase bg-muted px-2 py-1 rounded mr-2">{stat.category}</span>
                <span className="font-bold mr-2">{stat.label}</span>
                <span className="text-muted-foreground">{stat.valueNum ? `${stat.valueNum}%` : stat.valueText}</span>
              </div>
              <div className="flex gap-2 ml-4">
                <EditButton onClick={() => openEdit(stat)} />
                <DeleteButton onClick={() => deleteMutation.mutate(stat.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Stat" : "New Stat"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select 
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="big5">Big 5</option>
                <option value="mbti">MBTI / Enneagram</option>
                <option value="astrology">Astrology</option>
              </select>
            </div>
            <Input placeholder="Label (e.g. Openness)" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} required />
            <Input type="number" placeholder="Value Number (for Big 5)" value={formData.valueNum} onChange={e => setFormData({...formData, valueNum: e.target.value})} />
            <Input placeholder="Value Text (for others)" value={formData.valueText} onChange={e => setFormData({...formData, valueText: e.target.value})} />
            <Input type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} required />
            <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" /> Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Enter password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">Login</Button>
              <div className="text-center text-xs text-muted-foreground">
                Default: admin123
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Content Manager</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-8 w-full justify-start overflow-x-auto">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="facts">Fun Facts</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectManager />
          </TabsContent>

          <TabsContent value="services">
            <ServiceManager />
          </TabsContent>

          <TabsContent value="prompts">
            <PromptManager />
          </TabsContent>
          
          <TabsContent value="facts">
            <FactManager />
          </TabsContent>

          <TabsContent value="stats">
            <StatManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
