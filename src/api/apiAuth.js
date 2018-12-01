/**
 * @author João R. Santos <up201809187@fe.up.pt>
 */

import { post } from '../utils/http'

export function login(data) {
    return post('/auth/user', data)
}