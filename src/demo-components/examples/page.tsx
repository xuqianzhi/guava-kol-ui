import { AccordionDemo } from '@/demo-components/accordion-demo';
import { AlertDemo } from '@/demo-components/alert-demo';
import { AlertDialogDemo } from '@/demo-components/alert-dialog-demo';
import { AspectRatioDemo } from '@/demo-components/aspect-ratio-demo';
import { AvatarDemo } from '@/demo-components/avatar-demo';
import { BadgeDemo } from '@/demo-components/badge-demo';
import { BreadcrumbDemo } from '@/demo-components/breadcrumb-demo';
import { ButtonDemo } from '@/demo-components/button-demo';
import { CalendarDemo } from '@/demo-components/calendar-demo';
import { CardDemo } from '@/demo-components/card-demo';
import { CarouselDemo } from '@/demo-components/carousel-demo';
import { ChartDemo } from '@/demo-components/chart-demo';
import { CheckboxDemo } from '@/demo-components/checkbox-demo';
import { CollapsibleDemo } from '@/demo-components/collapsible-demo';
import { ComboboxDemo } from '@/demo-components/combobox-demo';
import { CommandDemo } from '@/demo-components/command-demo';
import { ComponentWrapper } from '@/demo-components/component-wrapper';
import { ContextMenuDemo } from '@/demo-components/context-menu-demo';
import { DatePickerDemo } from '@/demo-components/date-picker-demo';
import { DialogDemo } from '@/demo-components/dialog-demo';
import { DrawerDemo } from '@/demo-components/drawer-demo';
import { DropdownMenuDemo } from '@/demo-components/dropdown-menu-demo';
import { FormDemo } from '@/demo-components/form-demo';
import { HoverCardDemo } from '@/demo-components/hover-card-demo';
import { InputDemo } from '@/demo-components/input-demo';
import { InputOTPDemo } from '@/demo-components/input-otp-demo';
import { LabelDemo } from '@/demo-components/label-demo';
import { MenubarDemo } from '@/demo-components/menubar-demo';
import { NavigationMenuDemo } from '@/demo-components/navigation-menu-demo';
import { PaginationDemo } from '@/demo-components/pagination-demo';
import { PopoverDemo } from '@/demo-components/popover-demo';
import { ProgressDemo } from '@/demo-components/progress-demo';
import { RadioGroupDemo } from '@/demo-components/radio-group-demo';
import { ResizableDemo } from '@/demo-components/resizable-demo';
import { ScrollAreaDemo } from '@/demo-components/scroll-area-demo';
import { SelectDemo } from '@/demo-components/select-demo';
import { SeparatorDemo } from '@/demo-components/separator-demo';
import { SheetDemo } from '@/demo-components/sheet-demo';
import { SkeletonDemo } from '@/demo-components/skeleton-demo';
import { SliderDemo } from '@/demo-components/slider-demo';
import { SonnerDemo } from '@/demo-components/sonner-demo';
import { SwitchDemo } from '@/demo-components/switch-demo';
import { TableDemo } from '@/demo-components/table-demo';
import { TabsDemo } from '@/demo-components/tabs-demo';
import { TextareaDemo } from '@/demo-components/textarea-demo';
import { ToggleDemo } from '@/demo-components/toggle-demo';
import { ToggleGroupDemo } from '@/demo-components/toggle-group-demo';
import { TooltipDemo } from '@/demo-components/tooltip-demo';

export default function SinkPage() {
    return (
        <div className='mx-auto mt-4 grid max-w-7xl flex-1 gap-4'>
            <h2>These examples are taken from shadcn official repo on Github (https://github.com/shadcn-ui/ui)</h2>
            <ComponentWrapper name='chart' className='mt-4 w-full'>
                <ChartDemo />
            </ComponentWrapper>
            <ComponentWrapper name='accordion'>
                <AccordionDemo />
            </ComponentWrapper>
            <ComponentWrapper name='alert'>
                <AlertDemo />
            </ComponentWrapper>
            <ComponentWrapper name='alert-dialog'>
                <AlertDialogDemo />
            </ComponentWrapper>
            <ComponentWrapper name='aspect-ratio'>
                <AspectRatioDemo />
            </ComponentWrapper>
            <ComponentWrapper name='avatar'>
                <AvatarDemo />
            </ComponentWrapper>
            <ComponentWrapper name='badge'>
                <BadgeDemo />
            </ComponentWrapper>
            <ComponentWrapper name='breadcrumb'>
                <BreadcrumbDemo />
            </ComponentWrapper>
            <ComponentWrapper name='button'>
                <ButtonDemo />
            </ComponentWrapper>
            <ComponentWrapper name='calendar'>
                <CalendarDemo />
            </ComponentWrapper>
            <ComponentWrapper name='card'>
                <CardDemo />
            </ComponentWrapper>
            <ComponentWrapper name='carousel' className='hidden md:flex'>
                <CarouselDemo />
            </ComponentWrapper>
            <ComponentWrapper name='checkbox'>
                <CheckboxDemo />
            </ComponentWrapper>
            <ComponentWrapper name='collapsible'>
                <CollapsibleDemo />
            </ComponentWrapper>
            <ComponentWrapper name='combobox'>
                <ComboboxDemo />
            </ComponentWrapper>
            <ComponentWrapper name='command'>
                <CommandDemo />
            </ComponentWrapper>
            <ComponentWrapper name='context-menu'>
                <ContextMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper name='date-picker'>
                <DatePickerDemo />
            </ComponentWrapper>
            <ComponentWrapper name='dialog'>
                <DialogDemo />
            </ComponentWrapper>
            <ComponentWrapper name='drawer'>
                <DrawerDemo />
            </ComponentWrapper>
            <ComponentWrapper name='dropdown-menu'>
                <DropdownMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper name='form'>
                <FormDemo />
            </ComponentWrapper>
            <ComponentWrapper name='hover-card'>
                <HoverCardDemo />
            </ComponentWrapper>
            <ComponentWrapper name='input'>
                <InputDemo />
            </ComponentWrapper>
            <ComponentWrapper name='input-otp'>
                <InputOTPDemo />
            </ComponentWrapper>
            <ComponentWrapper name='label'>
                <LabelDemo />
            </ComponentWrapper>
            <ComponentWrapper name='menubar'>
                <MenubarDemo />
            </ComponentWrapper>
            <ComponentWrapper name='navigation-menu'>
                <NavigationMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper name='pagination'>
                <PaginationDemo />
            </ComponentWrapper>
            <ComponentWrapper name='popover'>
                <PopoverDemo />
            </ComponentWrapper>
            <ComponentWrapper name='progress'>
                <ProgressDemo />
            </ComponentWrapper>
            <ComponentWrapper name='radio-group'>
                <RadioGroupDemo />
            </ComponentWrapper>
            <ComponentWrapper name='resizable'>
                <ResizableDemo />
            </ComponentWrapper>
            <ComponentWrapper name='scroll-area'>
                <ScrollAreaDemo />
            </ComponentWrapper>
            <ComponentWrapper name='select'>
                <SelectDemo />
            </ComponentWrapper>
            <ComponentWrapper name='separator'>
                <SeparatorDemo />
            </ComponentWrapper>
            <ComponentWrapper name='sheet'>
                <SheetDemo />
            </ComponentWrapper>
            <ComponentWrapper name='skeleton'>
                <SkeletonDemo />
            </ComponentWrapper>
            <ComponentWrapper name='slider'>
                <SliderDemo />
            </ComponentWrapper>
            <ComponentWrapper name='sonner'>
                <SonnerDemo />
            </ComponentWrapper>
            <ComponentWrapper name='switch'>
                <SwitchDemo />
            </ComponentWrapper>
            <ComponentWrapper name='table'>
                <TableDemo />
            </ComponentWrapper>
            <ComponentWrapper name='tabs'>
                <TabsDemo />
            </ComponentWrapper>
            <ComponentWrapper name='textarea'>
                <TextareaDemo />
            </ComponentWrapper>
            <ComponentWrapper name='toggle'>
                <ToggleDemo />
            </ComponentWrapper>
            <ComponentWrapper name='toggle-group'>
                <ToggleGroupDemo />
            </ComponentWrapper>
            <ComponentWrapper name='tooltip'>
                <TooltipDemo />
            </ComponentWrapper>
        </div>
    );
}
