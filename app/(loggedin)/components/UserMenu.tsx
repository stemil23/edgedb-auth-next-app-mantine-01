'use client';

import { Button, Menu } from '@mantine/core';
// import UserAvatar from './Avatar';
import { ButtonLogout } from '@/components/Authentication/ButtonLogout';

export default function UserMenu() {
    return (
        <Menu trigger="hover" openDelay={100} closeDelay={400} withArrow>
            <Menu.Target>
                <Button>Hello</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Divider />
                <Menu.Item>View Profile</Menu.Item>
                <Menu.Item><ButtonLogout /></Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
