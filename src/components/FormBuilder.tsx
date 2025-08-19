import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Trash2, 
  Eye, 
  Save, 
  Sparkles, 
  Settings,
  GripVertical,
  FileText,
  Calendar,
  Mail,
  Phone,
  Hash,
  ToggleLeft
} from "lucide-react";

interface FormField {
  id: string;
  type: "text" | "email" | "number" | "textarea" | "select" | "checkbox" | "date" | "phone";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const fieldTypes = [
    { type: "text", label: "Text Input", icon: FileText },
    { type: "email", label: "Email", icon: Mail },
    { type: "number", label: "Number", icon: Hash },
    { type: "textarea", label: "Long Text", icon: FileText },
    { type: "select", label: "Dropdown", icon: ToggleLeft },
    { type: "checkbox", label: "Checkbox", icon: ToggleLeft },
    { type: "date", label: "Date", icon: Calendar },
    { type: "phone", label: "Phone", icon: Phone },
  ];

  const addField = (type: FormField["type"]) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: `Enter ${type}...`,
      required: false,
      options: type === "select" ? ["Option 1", "Option 2"] : undefined,
    };
    setFields([...fields, newField]);
    setSelectedField(newField.id);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
    if (selectedField === id) setSelectedField(null);
  };

  const aiSuggestions = [
    { type: "text", label: "Student Name", reason: "Common for registration forms" },
    { type: "email", label: "Email Address", reason: "For communication" },
    { type: "select", label: "Grade Level", reason: "Academic classification" },
    { type: "textarea", label: "Additional Comments", reason: "Feedback collection" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Smart Form Builder</h1>
          <p className="text-muted-foreground">Create dynamic forms with AI-powered suggestions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button className="bg-primary hover:bg-primary/90 shadow-glow">
            <Save className="w-4 h-4 mr-2" />
            Save Form
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Field Types Panel */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-sm">Field Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {fieldTypes.map((fieldType) => (
              <Button
                key={fieldType.type}
                variant="outline"
                className="w-full justify-start gap-2 h-10"
                onClick={() => addField(fieldType.type as FormField["type"])}
              >
                <fieldType.icon className="w-4 h-4" />
                {fieldType.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Form Builder */}
        <div className="lg:col-span-2 space-y-4">
          {/* Form Settings */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Form Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Form Title</Label>
                <Input
                  id="title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Enter form title..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe your form..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Preview */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm">Form Preview</CardTitle>
              <CardDescription>
                {fields.length} field{fields.length !== 1 ? 's' : ''} added
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formTitle && (
                <div className="border-b border-border pb-4">
                  <h2 className="text-xl font-semibold text-foreground">{formTitle}</h2>
                  {formDescription && (
                    <p className="text-muted-foreground mt-1">{formDescription}</p>
                  )}
                </div>
              )}

              {fields.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No fields added yet. Start by selecting a field type from the left panel.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedField === field.id 
                          ? "border-primary bg-primary-soft" 
                          : "border-border bg-background hover:border-muted"
                      }`}
                      onClick={() => setSelectedField(field.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                          <Label className="font-medium">
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {field.type}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeField(field.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {field.type === "textarea" ? (
                        <Textarea placeholder={field.placeholder} rows={3} />
                      ) : field.type === "select" ? (
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option..." />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option, i) => (
                              <SelectItem key={i} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input 
                          type={field.type} 
                          placeholder={field.placeholder}
                          disabled
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions & Field Editor */}
        <div className="space-y-4">
          {/* AI Suggestions */}
          <Card className="shadow-card bg-gradient-to-b from-accent/5 to-primary/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                AI Suggestions
              </CardTitle>
              <CardDescription>Smart field recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 rounded-lg bg-background border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{suggestion.label}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addField(suggestion.type as FormField["type"])}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Field Editor */}
          {selectedField && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-sm">Field Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const field = fields.find(f => f.id === selectedField);
                  if (!field) return null;

                  return (
                    <>
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          value={field.label}
                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Placeholder</Label>
                        <Input
                          value={field.placeholder || ""}
                          onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.required}
                          onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                        />
                        <Label>Required field</Label>
                      </div>
                      {field.type === "select" && (
                        <div className="space-y-2">
                          <Label>Options</Label>
                          {field.options?.map((option, i) => (
                            <div key={i} className="flex gap-2">
                              <Input
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...(field.options || [])];
                                  newOptions[i] = e.target.value;
                                  updateField(field.id, { options: newOptions });
                                }}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newOptions = field.options?.filter((_, index) => index !== i);
                                  updateField(field.id, { options: newOptions });
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
                              updateField(field.id, { options: newOptions });
                            }}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Option
                          </Button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;